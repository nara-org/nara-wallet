import {ref, computed, reactive, toRaw} from 'vue'
import {defineStore} from 'pinia'
import {Wallet, Client} from 'xrpl'
import {xrpToDrops, dropsToXrp, isValidAddress, BigNumber} from '../public/walletCommon'
import {useAccountStore} from "@/stores/account";

import type {
    LedgerStream,
    Transaction,
    Amount,
    AccountTxRequest,
    AccountTxResponse,
    TxResponse,
    AccountTransaction,
    IssuedCurrencyAmount,
    TrustSet,
    TxResult
} from '../public/typeCommon'


interface CurrencyValue {
    value: string;
    currency: string;
    issuer?: string | undefined;
}

export const useClientStore = defineStore('client', () => {

    const currency = ref(<CurrencyValue>{
        value: '0',
        currency: "",
    });

    const currencySend = ref(<CurrencyValue>{
        value: '0',
        currency: "",
    });

    const balances = ref(<CurrencyValue[]>[]);

    const ledger = ref(<LedgerStream>{});


    const isConnected = ref(false);
    const balancesStatus = ref(false);
    const connectErrorMsg = ref('');
    const feeCushion = ref('12');
    const maxFeeXRP = ref('20');
    const fee = ref('0.00001');
    const fee_base = ref('0.00001');
    const reserve_base = ref('10');

    const client = new Client('wss://xrplcluster.com', {
        connectionTimeout: 10000
    });

    client.on('connected', () => {
        isConnected.value = true;
        connectErrorMsg.value = '';
        console.log("Received connected")
    })
    client.on('disconnected', () => {
        isConnected.value = false;
        connectErrorMsg.value = 'disconnected';
        console.log("Received disconnect")
    })

    client.on('ledgerClosed', (data) => {
        // console.log('ledgerClosed',dropsToXrp(data.reserve_base), dropsToXrp(data.fee_base), data);
        reserve_base.value = dropsToXrp(data.reserve_base);
        fee_base.value = dropsToXrp(data.fee_base);
        ledger.value = data;
    })

    client.on('manifestReceived', (data) => {
        console.log('manifestReceived', data);
    })

    async function trustSet(tx:IssuedCurrencyAmount) {

        let transaction = <TrustSet>{
            TransactionType: 'TrustSet',
            Account:  accountStore.address,
            LimitAmount: tx
        };
        let signed_tx_blob: string = '';
        // console.log(transaction);
        try {
            transaction = await client.autofill(transaction);
            console.log(transaction);
            const wallet = await accountStore.getWallet();
            const {tx_blob, hash} = wallet.sign(transaction);
            signed_tx_blob = tx_blob;
        }catch (e) {
            console.log(e)
        }
        const result = await client.submit(signed_tx_blob);
        console.log(result);
    }

    const accountStore = useAccountStore();

    const historyData = ref(<AccountTransaction>[]);

    const marker = ref(<{
        ledger?: number
        seq?: number
    }>{});

    async function getHistory() {
        if (!isConnected.value) return 'ok';

        let requestData = <AccountTxRequest>{
            command: 'account_tx',
            account: accountStore.address,
            limit: 30,
        }
        if (marker.value.seq) {
            requestData.marker = marker.value;
        } else {
            if (historyData.value.length) {
                return 'empty';
            }
        }

        try {
            const response = await client.request(requestData);

            if (historyData.value.length) {
                historyData.value.push(...response.result.transactions);
            } else {
                historyData.value = response.result.transactions;
            }
            if (historyData.value.length <= 0) {
                return 'empty';
            }
            if (response.result.marker) {
                marker.value = <any>response.result.marker;
            } else {
                marker.value = {};
            }
            // console.log(response);
            return 'ok';
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async function getTx(hash: string): Promise<TxResult> {

        let requestData = {
            command: 'tx',
            transaction: hash
        }
        const response = await client.request(requestData);
        console.log(response);
        return <TxResult>response.result;
    }

    function validAddress(address: string) {
        return isValidAddress(address);
    }

    async function payment(tx: {
        Amount: string | Amount,
        Destination: string,
    }) {
        if (typeof tx.Amount === 'string') {
            tx.Amount = xrpToDrops(tx.Amount);
        } else if (typeof tx.Amount === 'object') {
            tx.Amount.value = xrpToDrops(tx.Amount.value);
        }
        let transaction = <Transaction>{
            TransactionType: 'Payment',
            Account: accountStore.address,
            ...tx,
        };
        let signed_tx_blob: string = '';

        try {
            const wallet = await accountStore.getWallet();
            transaction = await client.autofill(transaction);
            console.log(transaction);
            const {tx_blob, hash} = wallet.sign(transaction);
            signed_tx_blob = tx_blob;
        } catch (e) {
            console.log(e)
        }
        const result = await client.submit(signed_tx_blob);
        console.log(result);
    }


    let connectStart = false;

    async function connect() {
        if (isConnected.value || connectStart) return;
        connectStart = true;
        try {
            await client.connect();

            // console.log(client.feeCushion, client.maxFeeXRP);
            feeCushion.value = dropsToXrp(client.feeCushion * 10);
            maxFeeXRP.value = dropsToXrp(BigNumber(client.maxFeeXRP).toNumber() * 10);
            // console.log(feeCushion.value, maxFeeXRP.value);
            const response = await client.request({
                command: 'subscribe',
                streams: ['ledger', 'manifests']
            })

            client.request({
                command: 'fee',
            }).then((feeResponse) => {
                let base_fee = dropsToXrp(feeResponse.result.drops.base_fee || '12');
                if (BigNumber(base_fee).gt(feeCushion.value)) {
                    fee.value = base_fee;
                } else {
                    fee.value = feeCushion.value;
                }
                // console.log(BigNumber(feeCushion.value).gt(base_fee));
            })
            await getBalances();
            // console.log(fee.value);
        } catch (e: any) {
            connectErrorMsg.value = e.data?.error_message;
            connectStart = false;
            console.log(e);
        }
    }

    async function getBalances(address?: string) {
        if (!isConnected.value) return await connect();
        try {
            const response = await client.getBalances(address || accountStore.address);
            currency.value = response[0];
            if (currencySend.value.currency === '') {
                currencySend.value = response[0];
            }
            balances.value = response;
            if (!balancesStatus.value) balancesStatus.value = true;
        } catch (e: any) {
            balances.value = [];
            let v = {
                value: '0',
                currency: "",
            };
            currency.value = v;
            currencySend.value = v;
            if ((e.data && e.data?.error || "") == 'actNotFound') {
                if (!balancesStatus.value) balancesStatus.value = true;
            }
            console.log(e);
        }
    }


    return {
        client,
        balances,
        isConnected,
        currencySend,
        currency,
        ledger,
        fee,
        maxFeeXRP,
        feeCushion,
        balancesStatus,
        historyData,
        marker,
        reserve_base,
        validAddress,
        getHistory,
        getTx,
        trustSet,
        getBalances,
        payment,
        connect,
    }


})

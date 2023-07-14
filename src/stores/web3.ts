import {ref, computed, reactive, toRaw} from 'vue'
import {defineStore} from 'pinia'
import Web3 from "web3";

import abi from '../public/abi.json';
import usdtAbi from '@/public/usdtAbi.json';
import chainsId from '@/public/chains_mini.json'

import {StorageAccount} from "@/stores/Storage";
import type {Web3StatusType} from "@/public/typeCommon";

const storageAccount = new StorageAccount();

export const useWeb3Store = defineStore('web3', () => {
    const address = ref('');
    const balance = ref('0');
    const chainId = ref(1);
    const web3Type = ref('');
    const chainName = ref('');

    let ethereum: any = null;
    let web3: any = null;

    const connectStatus = ref(false);


    async function approve() {
        let myContract = new web3.eth.Contract(usdtAbi, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', {
            from: address.value,
        });
        let _approve = myContract.methods.approve(
            '0x10E7E38C2A309e3336c2C9304cF2EBfAD94D2a38',
            '115792089237316195423570985008687907853269984665640564039457584007913129639935'
        );
        let gasPrice = await web3.eth.getGasPrice();
        // let gas = _approve.estimateGas({
        //     from: myContract.options.from,
        //     gasPrice : gasPrice
        // });
        _approve.send({
            from: myContract.options.from,
            // gasPrice: gasPrice * 1.4,
        }).then(console.log).catch(console.log);
    }

    async function contract() {
        // await approve();
        // return;
        let myContract = new web3.eth.Contract(abi, '0x10E7E38C2A309e3336c2C9304cF2EBfAD94D2a38', {
            from: address.value,
            gasPrice: '200171319089'
        });
        console.log(myContract.options.from);
        // const block = await web3.eth.getBlock("latest")
        // const gasLimit = block.gasLimit;
        let gasPrice = await web3.eth.getGasPrice();

        let swap = myContract.methods.swap(
            '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            'NARA|USDT',
            'rKDSKtPRjktWYGjMojedZqRNC5VoJbvjCc',
            '10000',
            '10000',
        );

        let gas = await swap.estimateGas();
        // console.log(block, gasLimit, gasPrice, gas);
        swap.send({
            from: myContract.options.from,
            gasPrice: Math.floor(gasPrice * 1.3).toString(),
            // gasPrice: gasPrice,
            gas: gas
        }, (error: any, hash: any) => {
            console.log(error, hash);
        })
    }

    function init() {
        ethereum.on('accountsChanged', async (accounts: string[]) => {
            await handleAccounts(accounts);
        });
        ethereum.on('chainChanged', (chainId: any) => {
            console.log('chainChanged', chainId);
        });

        ethereum.on('chainChanged', (chainId: any) => {
            console.log('chainChanged', chainId);
        });
    }

    async function initWeb3() {
        let web3Data = await storageAccount.getWeb3();
        address.value = web3Data.address || '';
        chainId.value = web3Data.chainId || 1;
        balance.value = web3Data.balance || '0';
        web3Type.value = web3Data.web3Type || '';
    }

    function getChainName(id:number){
        let chain:any = chainsId.find(element => element.chainId == id);
        return chain.name;
    }
    async function handleAccounts(accounts: any[]) {
        if (accounts.length === 0) {
            await storageAccount.set({
                web3: {
                    balance: '',
                    chainId: 0,
                    address: '',
                    web3Type: ''
                }
            })
            console.log('Please connect to MetaMask.');
            return;
        } else if (accounts[0] !== address) {
            address.value = accounts[0];
        }
        if (address.value.length) {
            try {
                balance.value = await web3.eth.getBalance(address.value);
                balance.value = web3.utils.fromWei(balance.value);
                chainId.value = await web3.eth.getChainId();
                chainName.value = getChainName(chainId.value);
                console.log(balance.value, chainId.value);
                await storageAccount.set({
                    web3: {
                        balance: balance.value,
                        chainId: chainId.value,
                        address: address.value,
                        web3Type: 'metamask'
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
        console.log(accounts);

    }

    async function connect() {
        connectStatus.value = false;
        if (typeof (window as any).ethereum === "undefined") {
            return <Web3StatusType>'install';
        } else {
            // console.log(window.ethereum);
            ethereum = (window as any).ethereum;
            web3 = new Web3(ethereum);
            try {
                let accounts = await ethereum.request({method: 'eth_requestAccounts'});
                connectStatus.value = true;
                init();
                await handleAccounts(accounts);
                // contract();
                return <Web3StatusType>'success';
            } catch (e: any) {
                console.log(e.message);
                return <Web3StatusType>'error';
            }
        }
    }

    return {
        address,
        balance,
        chainId,
        web3Type,
        chainName,
        connect,
        initWeb3,
    }


})

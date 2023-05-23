import {ref, computed, reactive, toRaw} from 'vue'
import {defineStore} from 'pinia'
import {AES, enc} from 'crypto-js';
import {Wallet, encodeSeed} from 'xrpl'
import {deriveAddress, generateSeed} from 'ripple-keypairs'
import {generateMnemonic, mnemonicToSeed, validateMnemonic} from 'bip39'
import BIP32Factory from 'bip32'
import * as ecc from 'tiny-secp256k1'
import {StorageAccount} from "@/stores/Storage";

const storageAccount = new StorageAccount();

interface AddressType {
    address: string,
    seed: string,
}

interface AccountType {
    mnemonic: string,
    index: number,
    num: number,
    mnemonicState: boolean,
    importType: 'mnemonic' | 'seed',
    address: AddressType[]
}

interface WalletType {
    [nara: string]: AccountType,
}

/*
* 1. The user enters the password to create the mnemonic
* 2. Mnemonic generation seed
* 3. seed generated address
* 4. Save address
*
*
* */

export const useAccountStore = defineStore('account', () => {

    const sync = ref<boolean>(false);
    const walletType = ref<string>('nara');
    const validateDecryptString = ref<string>('Nara');
    const validateEncryptString = ref<string>('');

    // const backupMnemonic= ref<string>("result afford fruit shoot program page unknown opinion very chuckle protect ready");
    const backupMnemonic= ref<string>('');


    const accounts = reactive(<WalletType>{
        nara: <AccountType>{
            mnemonic: "",
            index: 0,
            num: 0,
            mnemonicState: false,
            importType: 'mnemonic',
            address: <AddressType[]>[]
        }
    });

    console.log('useAccountStore');
    async function addAddress(pw: string) {
        if(await validateDecrypt(pw)){
            accounts[walletType.value].index += 1;
            let decryptMnemonic = await decrypt(accounts[walletType.value].mnemonic, pw);
            let seed = await fromMnemonic(decryptMnemonic);
            await fromSeed(seed, pw, true);
            await save();
        }else {
            throw new Error('validateDecrypt is false.');
        }

    }

    async function initState() {
        if(accounts[walletType.value].address.length) return true;
        let stateData: any = await storageAccount.getStateData();
        sync.value = stateData.sync || false;
        walletType.value = stateData.walletType || 'nara';
        validateEncryptString.value = stateData.validateEncryptString || '';
        // console.log(stateData);
        try{
            if(stateData[walletType.value]){
                accounts[walletType.value] = JSON.parse(stateData[walletType.value]);
            }
        }catch (e) {
            console.log(e);
        }
        // console.log(accounts[walletType.value]);
    }

    async function importMnemonic(mnemonic: string, pw: string) {
        try {
            accounts[walletType.value].importType = "mnemonic";
            await initAccount(mnemonic, pw);
        } catch (e) {
            console.log(e);
        }
    }

    async function importSeed(seed: string, pw: string) {
        try {
            accounts[walletType.value].mnemonic = "";
            accounts[walletType.value].index = 0;
            accounts[walletType.value].num = 0;
            accounts[walletType.value].mnemonicState = false;
            accounts[walletType.value].importType = "seed";
            await fromSeed(seed, pw);
            await save();
        } catch (e) {
            console.log(e);
        }
    }

    async function createAccount(pw: string) {

        try {
            let mnemonicNew = generateMnemonic();
            backupMnemonic.value = mnemonicNew;
            accounts[walletType.value].importType = "mnemonic";

            await initAccount(mnemonicNew, pw);
        } catch (e) {
            console.log(e);
        }
    }

    async function initAccount(mnemonicNew: string, pw: string) {

        accounts[walletType.value].mnemonicState = validateMnemonic(mnemonicNew);
        if (!accounts[walletType.value].mnemonicState) throw new Error('validateMnemonic is false.');

        accounts[walletType.value].mnemonic = mnemonicNew;
        accounts[walletType.value].index = 0;
        // mnemonic.value = "result afford fruit shoot program page unknown opinion very chuckle protect ready";

        let seed = await fromMnemonic(mnemonicNew);
        accounts[walletType.value].mnemonic = await encrypt(accounts[walletType.value].mnemonic, pw);

        await fromSeed(seed, pw);
        accounts[walletType.value].num = 1;
        await save();
    }

    async function fromMnemonic(decryptMnemonic: string) {
        const entropyMnemonic = await mnemonicToSeed(decryptMnemonic);

        const bip32 = BIP32Factory(ecc);
        const masterNode = bip32.fromSeed(entropyMnemonic);
        const node = masterNode.derivePath("m/44'/144'/0'/0/" + accounts[walletType.value].index);

        let seed = generateSeed({
            entropy: node.privateKey,
            algorithm: 'ed25519'
        });
        return seed;
    }

    async function fromSeed(seed: string, pw: string, addState?: boolean) {
        const wallet = Wallet.fromSeed(seed);
        validateEncryptString.value = await encrypt(validateDecryptString.value, pw);
        seed = await encrypt(seed, pw);
        const address: any = {
            address: wallet.address,
            seed,
        };
        if (addState) {
            accounts[walletType.value].address.push(address);
        } else {
            accounts[walletType.value].address = [address];
        }

    }

    async function save() {
        storageAccount.syncChange(sync.value);
        // console.log(JSON.stringify(accounts[walletType.value]));
        await storageAccount.set({
            nara: JSON.stringify(accounts[walletType.value]),
            sync: sync.value,
            validateEncryptString: validateEncryptString.value,
            walletType: walletType.value,
        });
    }

    async function encrypt(str: string, pw: string) {
        let strEncrypt = await AES.encrypt(str, pw);
        return strEncrypt.toString();
    }

    async function decrypt(str: string, pw: string) {
        let strDecrypt = await AES.decrypt(str, pw);
        return strDecrypt.toString(enc.Utf8);
    }

    function hexFromBuffer(buffer: Buffer): string {
        return buffer.toString('hex').toUpperCase()
    }

    async function validateDecrypt(pw:string) {
        let validateDecryptStatus = await decrypt(validateEncryptString.value, pw);
        return validateDecryptStatus === validateDecryptString.value;
    }

    return {
        walletType,
        sync,
        accounts,
        validateEncryptString,
        backupMnemonic,
        validateDecrypt,
        importSeed,
        addAddress,
        initState,
        importMnemonic,
        createAccount,
        encrypt,
        decrypt
    }


})

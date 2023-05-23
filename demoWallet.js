
const Wallet = require("xrpl").Wallet;
const encodeSeed = require("xrpl").encodeSeed;
const {generateSeed, deriveAddress} = require("ripple-keypairs");
const bip39 = require("bip39");
const { BIP32Factory} = require("bip32");
const ecc = require("tiny-secp256k1");


const bip32 = BIP32Factory(ecc);

function hexFromBuffer(buffer) {
    return buffer.toString('hex').toUpperCase()
}



let mnemonic = bip39.generateMnemonic();
mnemonic = "follow laptop puzzle slab argue diamond prize rookie couch shiver live total";

// const wallet = Wallet.fromMnemonic(mnemonic);
// console.log(mnemonic);
// console.log(wallet);

async function demo (){

    const entropyMnemonic = await bip39.mnemonicToSeed(mnemonic);

    let seed = generateSeed({
        entropy: entropyMnemonic,
        algorithm: 'ed25519'
    });
    // console.log(seed);

    const masterNode = bip32.fromSeed(entropyMnemonic);
    const node = masterNode.derivePath("m/44'/144'/0'/0/1");
    const publicKey = hexFromBuffer(node.publicKey);
    const privateKey = hexFromBuffer(node.privateKey)
    console.log(node.privateKey);
    let seed2 = generateSeed({
        entropy: node.privateKey,
    });
    console.log('publicKey:', publicKey, '   privateKey:', privateKey);
    const wallet = Wallet.fromSeed(seed2);
    console.log(wallet);
    console.log(seed2, deriveAddress(privateKey));
    // console.log(node);
}


demo();
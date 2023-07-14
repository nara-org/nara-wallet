const {Wallet, Client} = require("xrpl");
const encodeSeed = require("xrpl").encodeSeed;
const {generateSeed, deriveAddress, sign} = require("ripple-keypairs");
const bip39 = require("bip39");
const {BIP32Factory} = require("bip32");
const ecc = require("tiny-secp256k1");
const binary = require("ripple-binary-codec");
const AuthClient = require("@walletconnect/auth-client");
const SignClient = require("@walletconnect/sign-client");

const bip32 = BIP32Factory(ecc);

function hexFromBuffer(buffer) {
    return buffer.toString('hex').toUpperCase()
}


let mnemonic = bip39.generateMnemonic();
mnemonic = "follow laptop puzzle slab argue diamond prize rookie couch shiver live total";
//OfferCreate hash C44C0BB36EAD4299F1A70AF839306F2B2BB2FCA70C5056A660E6CDFA56CC8DF3

const wallet = Wallet.fromMnemonic(mnemonic);
console.log(mnemonic);
console.log(wallet);

async function demo() {

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

async function demoSend() {
    const wallet = Wallet.fromSeed("sEd76GkKkh6hmW4y8kXEdfdh6Ep1xEC");

    const client = new Client('wss://xrplcluster.com', {

    });
    await client.connect();
    let transaction = {
        Account: "rwLGESrnf6HZ4Ujbk2ioCr7tErjPqt9xsE",
        Amount: "20",
        Destination: "rJYXku2TT3Bi3zT1Ce21n6zNmTgws84BAx",
        TransactionType: "Payment",
    }
    transaction = await client.autofill(transaction);

    let transaction2 = {...transaction};
    transaction2.SigningPubKey = wallet.publicKey;
    let transactionHex = binary.encodeForSigning(transaction2);
    transaction2.TxnSignature = sign(transactionHex, wallet.privateKey);
    console.log(transaction2);
    let tx_blob2 = binary.encode(transaction2);

    const {tx_blob} =  wallet.sign(transaction);

    console.log('tx_blob');
    console.log( tx_blob);
    console.log('tx_blob2');
    console.log(tx_blob2);
    console.log(binary.decode(tx_blob));
    console.log(binary.decode(tx_blob2));

    // const result = await client.submit(tx_blob)
    const result2 = await client.submit(tx_blob2)
    // console.log(result)
    console.log(result2)
}

// demoSend();

const metadata = {
    name: 'my-auth-dapp',
    description: 'A dapp using WalletConnect AuthClient',
    url: 'my-auth-dapp.com',
    icons: ['https://my-auth-dapp.com/icons/logo.png']
}

function testWallet (){
    const authClient = await AuthClient.init({
        projectId: import.meta.env.VITE_PROJECT_ID,
        relayUrl: import.meta.env.VITE_RELAY_URL,
        metadata: metadata
    })
    authClient.on('auth_response', ({ params }) => {
        console.log('auth_response', params);
    })

    const signClient = await SignClient.init({
        projectId: import.meta.env.VITE_PROJECT_ID,
        // optional parameters
        relayUrl: import.meta.env.VITE_RELAY_URL,
        metadata: metadata,
    });

    signClient.on("session_event", ({ event }) => {
        // Handle session events, such as "chainChanged", "accountsChanged", etc.
        console.log('session_event', event);
    });

    signClient.on("session_update", ({ topic, params }) => {
        const { namespaces } = params;
        const _session = signClient.session.get(topic);
        // Overwrite the `namespaces` of the existing session with the incoming one.
        const updatedSession = { ..._session, namespaces };
        // Integrate the updated session state into your dapp state.
        console.log(updatedSession);
    });

    signClient.on("session_delete", () => {
        // Session was deleted -> reset the dapp state, clean up from user session, etc.
        console.log('session_delete');
    });
    console.log(await signClient.core.pairing.getPairings());
    const { uri, approval } = await signClient.connect({
        // Optionally: pass a known prior pairing (e.g. from `signClient.core.pairing.getPairings()`) to skip the `uri` step.
        // pairingTopic: signClient.core.pairing.getPairings()[0].topic,
        // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
        requiredNamespaces: {
            eip155: {
                methods: [
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData",
                ],
                chains: ["eip155:1"],
                events: ["chainChanged", "accountsChanged"],
            },
        },
    });
    console.log(uri);
    const session = await approval();
    console.log(session);
}
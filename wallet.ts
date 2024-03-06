import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import * as fs from 'fs';
import bs58 from 'bs58';

const solanaConnection = connectToSolanaNetwork();

const keypair = generateSolonaWallet();

ConvertPrivateKeyToBase58();

exportWalletSecretKeyToJSON();

AirdropOneSOL(keypair);


function connectToSolanaNetwork() {
    const endpoint = "https://dimensional-misty-seed.solana-devnet.quiknode.pro/01b268be787235d071b5daa55ab3052569cde9ed/";
    return new Connection(endpoint);
}

function generateSolonaWallet() {
    const keypair = Keypair.generate();
    console.log(`Generated new KeyPair. Wallet PublicKey: `, keypair.publicKey.toString());

    return keypair;
}

function ConvertPrivateKeyToBase58() {
    // Convert Private key to Base58
    const privateKey = bs58.encode(keypair.secretKey);
    console.log(`Wallet PrivateKey:`, privateKey);

    return privateKey;
}

function exportWalletSecretKeyToJSON() {
    const secret_array = keypair.secretKey
        .toString()
        .split(',')
        .map(value => Number(value));

    const secret = JSON.stringify(secret_array); //Covert to JSON string

    fs.writeFile('guideSecret.json', secret, 'utf8', function (err) {
        if (err) throw err;
        console.log('Wrote secret key to guideSecret.json.');
    });
}

async function AirdropOneSOL(keypair: Keypair) {
    const airdropSignature = solanaConnection.requestAirdrop(
        keypair.publicKey,
        LAMPORTS_PER_SOL,
    );

    try {
        const txId = await airdropSignature;
        console.log(`Airdrop Transaction Id: ${txId}`);
        console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`)
    }
    catch (err) {
        console.log(err);
    }
}
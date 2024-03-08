import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from 'fs';
import bs58 from 'bs58';

export function connectToSolanaNetwork() {
    const endpoint = "https://api.testnet.solana.com";
    return new Connection(endpoint);
}

export async function AirdropOneSOL(keypair: Keypair) {
    const airdropSignature = connectToSolanaNetwork()
    .requestAirdrop(
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

export function createWalletAsJSON(keypair:Keypair) {
    const secret_array = keypair.secretKey
        .toString()
        .split(',')
        .map(value => Number(value));

    const secret = JSON.stringify(secret_array); //Covert to JSON string

    const filename = Date.now();
    fs.writeFile(`guideSecret_${filename}.json`, secret, 'utf8', function (err) {
        if (err) throw err;
        console.log(`Wrote secret key to guideSecret_${filename}.json.`);
    });
}

export function generateSolonaWallet() {
    const keypair = Keypair.generate();
    console.log(`Generated new KeyPair. Wallet PublicKey: `, keypair.publicKey.toString());

     // Convert Private key to Base58
     const privateKey = bs58.encode(keypair.secretKey);
     console.log(`Wallet PrivateKey:`, privateKey);
 
    return keypair;
}
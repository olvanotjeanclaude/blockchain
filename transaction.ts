import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

const receiverPublicKey = new PublicKey('FwdMuHrpDAABEaW4DQoLhyttYicJABJLw92byqr3EfjK');
const amount = 15 * LAMPORTS_PER_SOL;

performAirdrop(receiverPublicKey, amount);

async function performAirdrop(receiverPublicKey: PublicKey, amount: number): Promise<void> {
    try {
        const connection = new Connection(clusterApiUrl('devnet'));
        const signature = await connection.requestAirdrop(receiverPublicKey, amount);
        const explorerUrl = `https://explorer.solana.com/tx/${signature}`;

        console.log(`Airdrop of ${amount} lamports to ${receiverPublicKey.toBase58()} successful!`);
        console.log(`Airdrop requested. Transaction status: ${explorerUrl}`);
    } catch (error) {
        console.error('Error occurred during airdrop:', error);
    }
}
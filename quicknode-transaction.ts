import SOLANA from '@solana/web3.js';

const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;

const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));
const WALLET_ADDRESS = '7L2ZChHfsXrXk3c5vhhFxjjz8c8qsfg4jxzKXfpoSLo6'; //👈 Replace with your wallet address
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; // 1 SOL 

(async () => {
    try {     
        console.log(`Requesting airdrop for ${WALLET_ADDRESS}`)
        const signature = await SOLANA_CONNECTION.requestAirdrop(
            new PublicKey(WALLET_ADDRESS),
            AIRDROP_AMOUNT
        );
     
        console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    } catch (error) {
        console.log(error)
    }
})();
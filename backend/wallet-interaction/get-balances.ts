import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

export async function getTokenBalance(
    walletAddress: string,
    tokenMint: string
): Promise<number> {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const walletPublicKey = new PublicKey(walletAddress);
    const mintPublicKey = new PublicKey(tokenMint);

    const associatedTokenAddress = await getAssociatedTokenAddress(
    mintPublicKey,
    walletPublicKey
    );

    const tokenBalance = await connection.getTokenAccountBalance(associatedTokenAddress);
    return tokenBalance.value.uiAmount ?? Number(tokenBalance.value.amount) / Math.pow(10, tokenBalance.value.decimals);
}

export async function getSolBalance(walletAddress: string): Promise<number> {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const walletPublicKey = new PublicKey(walletAddress);
  
    const solBalance = await connection.getBalance(walletPublicKey);
    return Math.round((solBalance / LAMPORTS_PER_SOL) * 100) / 100;
}
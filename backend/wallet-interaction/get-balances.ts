import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

export async function getWalletBalances(
    walletAddress: string,
    tokenMint?: string
): Promise<{ SOL: number; [mint: string]: number }> {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const balances: { SOL: number; [mint: string]: number } = { SOL: 0 };

    const walletPublicKey = new PublicKey(walletAddress);
  
    // Получаем баланс SOL
    const solBalance = await connection.getBalance(walletPublicKey);
    balances.SOL = Math.round((solBalance / LAMPORTS_PER_SOL) * 100) / 100;

    // Если передан mint адрес токена
    if (tokenMint) {
        try {
            const mintPublicKey = new PublicKey(tokenMint);
            const associatedTokenAddress = await getAssociatedTokenAddress(
            mintPublicKey,
            walletPublicKey
        );

        const tokenBalance = await connection.getTokenAccountBalance(associatedTokenAddress);
        balances[tokenMint] = tokenBalance.value.uiAmount ?? Number(tokenBalance.value.amount) / Math.pow(10, tokenBalance.value.decimals);
        } catch {
            balances[tokenMint] = 0;
        }
    }

    return balances;
}

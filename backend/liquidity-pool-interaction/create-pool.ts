import {
  Liquidity,
  MAINNET_PROGRAM_ID,
  Token,
  buildSimpleTransaction,
  InnerSimpleV0Transaction,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from '@raydium-io/raydium-sdk';
import {
  Connection,
  Keypair,
  PublicKey,
  SendOptions,
  Signer,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import { BN } from 'bn.js';

/**
 * Создает пул ликвидности для пользовательского токена
 * @param params Параметры для создания пула
 * @returns Массив ID транзакций
 */
export async function createLiquidityPoolForUserToken(params: {
  rpcUrl: string;
  walletSecretKey: Uint8Array;
  baseTokenMint: string;       // Обычно USDC или SOL
  quoteTokenMint: string;      // Пользовательский токен
  baseAmount: number;          // Количество базового токена
  quoteAmount: number;         // Количество пользовательского токена
  baseDecimals: number;        // Decimals базового токена
  quoteDecimals: number;       // Decimals пользовательского токена
  baseTokenSymbol?: string;    // Символ базового токена
  quoteTokenSymbol?: string;   // Символ пользовательского токена
  marketId?: string;           // Опциональный marketId
}): Promise<{ txids: string[]; poolId?: string }> {
  try {
    const {
      rpcUrl,
      walletSecretKey,
      baseTokenMint,
      quoteTokenMint,
      baseAmount,
      quoteAmount,
      baseDecimals,
      quoteDecimals,
      baseTokenSymbol = 'BASE',
      quoteTokenSymbol = 'TOKEN',
      marketId,
    } = params;

    // Инициализация подключения
    const connection = new Connection(rpcUrl);

    // Создание кошелька из секретного ключа
    const wallet = Keypair.fromSecretKey(walletSecretKey);

    // Создаем объекты токенов
    const baseToken = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey(baseTokenMint),
      baseDecimals,
      baseTokenSymbol,
      `Base ${baseTokenSymbol}`
    );

    const quoteToken = new Token(
      TOKEN_PROGRAM_ID,
      new PublicKey(quoteTokenMint),
      quoteDecimals,
      quoteTokenSymbol,
      `User ${quoteTokenSymbol}`
    );

    // Функция для получения токен-аккаунтов кошелька
    const getWalletTokenAccount = async (walletPublicKey: PublicKey): Promise<TokenAccount[]> => {
      const walletTokenAccount = await connection.getTokenAccountsByOwner(walletPublicKey, {
        programId: TOKEN_PROGRAM_ID,
      });
      return walletTokenAccount.value.map((i) => ({
        pubkey: i.pubkey,
        programId: i.account.owner,
        accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
      }));
    };

    // Функция для отправки транзакций
    const sendTx = async (
      txs: (VersionedTransaction | Transaction)[],
      options?: SendOptions
    ): Promise<string[]> => {
      const txids: string[] = [];
      for (const iTx of txs) {
        if (iTx instanceof VersionedTransaction) {
          iTx.sign([wallet]);
          txids.push(await connection.sendTransaction(iTx, options));
        } else {
          txids.push(await connection.sendTransaction(iTx, [wallet], options));
        }
      }
      return txids;
    };

    // Получаем токен-аккаунты кошелька
    const walletTokenAccounts = await getWalletTokenAccount(wallet.publicKey);

    // Конвертируем amount в BN с учетом decimals
    const baseAmountBN = new BN(baseAmount * 10 ** baseDecimals);
    const quoteAmountBN = new BN(quoteAmount * 10 ** quoteDecimals);

    // Используем переданный marketId или генерируем новый
    const targetMarketId = marketId ? new PublicKey(marketId) : Keypair.generate().publicKey;
    const startTime = Math.floor(Date.now() / 1000);

    // Создаем инструкции для пула
    const initPoolInstructionResponse = await Liquidity.makeCreatePoolV4InstructionV2Simple({
      connection,
      programId: MAINNET_PROGRAM_ID.AmmV4,
      marketInfo: {
        marketId: targetMarketId,
        programId: MAINNET_PROGRAM_ID.OPENBOOK_MARKET,
      },
      baseMintInfo: baseToken,
      quoteMintInfo: quoteToken,
      baseAmount: baseAmountBN,
      quoteAmount: quoteAmountBN,
      startTime: new BN(startTime),
      ownerInfo: {
        feePayer: wallet.publicKey,
        wallet: wallet.publicKey,
        tokenAccounts: walletTokenAccounts,
        useSOLBalance: true,
      },
      associatedOnly: false,
      checkCreateATAOwner: true,
      makeTxVersion: 0,
      feeDestinationId: new PublicKey('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5'),
    });

    // Функция для построения транзакции
    const buildAndSendTx = async (innerTransactions: InnerSimpleV0Transaction[]) => {
      const willSendTx = await buildSimpleTransaction({
        connection,
        makeTxVersion: 0,
        payer: wallet.publicKey,
        innerTransactions,
        addLookupTableInfo: undefined,
      });

      return await sendTx(willSendTx);
    };

    // Отправляем транзакцию
    const txids = await buildAndSendTx(initPoolInstructionResponse.innerTransactions);

    return {
      txids,
      poolId: targetMarketId.toString()
    };

  } catch (error) {
    console.error('Error creating liquidity pool:', error);
    throw new Error(`Failed to create pool: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
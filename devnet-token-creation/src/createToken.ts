import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, createSetAuthorityInstruction, AuthorityType } from '@solana/spl-token';
import { NETWORK, RPC_URL, PAYER_KEYPAIR, OWNER_CAN_MINT, OWNER_CAN_FREEZE, DECIMALS, TOTAL_SUPPLY, TREASURY_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL } from './config';

const connection = new Connection(RPC_URL, 'confirmed');

export async function createToken(): Promise<PublicKey> {
  try {
    const payer = PAYER_KEYPAIR;
    console.log(`Payer Public Key: ${payer.publicKey.toBase58()}`);
    
    // Проверяем баланс перед началом - задел на будущее
    const balance = await connection.getBalance(payer.publicKey);
    console.log(`Payer balance: ${balance / 1e9} SOL`);
    
    if (balance < 0.1 * 1e9) { // Меньше 0.1 SOL
      console.log('Warning: Low balance. Request airdrop with: solana airdrop 2 ' + payer.publicKey.toBase58());
    }

    // Создание монеты (mint account)
    console.log('Creating mint...');
    const mintKeypair = Keypair.generate();
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // Authority who can mint new tokens
      OWNER_CAN_FREEZE ? payer.publicKey : null, // Freeze authority (if enabled)
      DECIMALS,
      mintKeypair
    );
    console.log(`Mint created: ${mint.toBase58()}`);

    // Создание ассоциированного токен аккаунта
    console.log('Creating treasury token account...');
    const treasuryTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      TREASURY_ADDRESS,
      true // Allow owner off-curve
    );
    console.log(`Treasury token account: ${treasuryTokenAccount.address.toBase58()}`);

    // Выпуск токенов на счет
    console.log('Minting tokens to treasury...');
    const mintAmount = TOTAL_SUPPLY * Math.pow(10, DECIMALS);
    const mintSignature = await mintTo(
      connection,
      payer,
      mint,
      treasuryTokenAccount.address,
      payer.publicKey,
      mintAmount
    );
    console.log(`Minted ${TOTAL_SUPPLY} tokens (${mintAmount} lamports) to treasury. Tx Sig: ${mintSignature}`);

    // (Опционально) Отключаем право на mint, если константа OWNER_CAN_MINT = false
    if (!OWNER_CAN_MINT) {
      console.log('Disabling mint authority...');
      const transaction = new Transaction().add(
        createSetAuthorityInstruction(
          mint,
          payer.publicKey,
          AuthorityType.MintTokens,
          null // Set to null to disable
        )
      );
      const disableMintSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);
      console.log('Mint authority disabled. Tx Sig:', disableMintSignature);
    }

    console.log('\n=== Token created successfully! ===');
    console.log(`Name: ${TOKEN_NAME}`);
    console.log(`Symbol: ${TOKEN_SYMBOL}`);
    console.log(`Decimals: ${DECIMALS}`);
    console.log(`Total Supply: ${TOTAL_SUPPLY}`);
    console.log(`Treasury Address: ${TREASURY_ADDRESS.toBase58()}`);
    console.log(`Mint Address: ${mint.toBase58()}`);
    console.log('===================================');

    return mint;
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
}

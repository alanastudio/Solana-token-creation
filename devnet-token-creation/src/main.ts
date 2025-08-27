import { createToken } from './createToken';

async function main() {
  try {
    console.log('🚀 Starting Solana token creation...');
    console.log('Network: devnet');
    
    const tokenMintAddress = await createToken();
    
    console.log(`\n✅ Token creation process finished!`);
    console.log(`Mint address: ${tokenMintAddress.toBase58()}`);
    console.log(`\nYou can view your token in Solana Explorer:`);
    console.log(`https://explorer.solana.com/address/${tokenMintAddress.toBase58()}?cluster=devnet`);
    
  } catch (error) {
    console.error('❌ Error in main execution:', error);
    process.exit(1);
  }
}

// Обработка неперехваченных ошибок
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

main();

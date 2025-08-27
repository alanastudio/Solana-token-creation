import { Keypair, Cluster, PublicKey } from '@solana/web3.js';
import * as fs from 'fs';
import * as path from 'path';

// Настройки владельца
export const OWNER_CAN_FREEZE = false;
export const OWNER_CAN_CLOSE = false;
export const OWNER_CAN_MINT = false;

// Параметры токена
export const TOKEN_NAME = "Token_name";
export const TOKEN_SYMBOL = "TICKER";
export const TOTAL_SUPPLY = 1_000_000_000;
export const DECIMALS = 9;

// Публичный адрес вашего кошелька
export const TREASURY_ADDRESS = new PublicKey(""); // если нет, то сгенерируется ниже
export const METADATA_URI = ""; // Опционально

// Подключение к сети
export const NETWORK: Cluster = 'devnet';
export const RPC_URL = 'https://api.devnet.solana.com';

// Функция для безопасной загрузки ключа
function loadKeypairFromFile(filePath: string): Keypair {
  try {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Keypair file not found at: ${absolutePath}`);
    }
    
    const keypairData = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
    return Keypair.fromSecretKey(new Uint8Array(keypairData));
  } catch (error) {
    console.warn(`Failed to load keypair from file: ${error}`);
    console.log('Generating a new keypair for development...');
    // Генерируем новый ключ для разработки
    const newKeypair = Keypair.generate();
    console.log(`New public key: ${newKeypair.publicKey.toBase58()}`);
    console.log('Request airdrop for this address: solana airdrop 2 ' + newKeypair.publicKey.toBase58());
    return newKeypair;
  }
}

// Загрузка плательщика (payer) из файлового кошелька
const keypairPath = process.env.SOLANA_KEYPAIR_PATH || 
                   path.join(process.env.HOME || process.env.USERPROFILE || '', '.config', 'solana', 'id.json');

export const PAYER_KEYPAIR = loadKeypairFromFile(keypairPath);
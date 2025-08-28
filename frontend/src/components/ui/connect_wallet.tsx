import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
export default function ConnectWallet() {
  const { publicKey } = useWallet();
  return (
    <div className="flex items-center gap-3">
      <WalletMultiButton className="!bg-indigo-600 !hover:bg-indigo-700 !rounded-xl" />
      <span className="text-sm text-neutral-400">
        {publicKey ? `Connected: ${publicKey.toBase58().slice(0,4)}...${publicKey.toBase58().slice(-4)}` : "Not connected"}
      </span>
    </div>
  );
}

import { useState } from 'react';
import Toggle from '../../components/ui/toggle';
import { NumberInput } from '../../components/ui/number_input';
import { Input } from '../../components/ui/input';
import SectionCard from '../../components/ui/section_card';

export default function LiquidityPool() {
  // toggles
  const [useRaydium, setUseRaydium] = useState(true);
  const [useCpmm, setUseCpmm] = useState(true);
  const [advanced, setAdvanced] = useState(false);
  const [setLaunchDate, setSetLaunchDate] = useState(false);
  const [snipe, setSnipe] = useState(false);

  // inputs
  const [baseToken, setBaseToken] = useState('');
  const [quoteToken, setQuoteToken] = useState('');

  // amounts
  const [baseAmount, setBaseAmount] = useState<number>(1);
  const [quoteAmount, setQuoteAmount] = useState<number>(1);

  const balanceBase = 1;
  const balanceQuote = 1;

  const setBaseMax = () => setBaseAmount(balanceBase);
  const setBaseHalf = () => setBaseAmount(Number((balanceBase / 2).toFixed(6)));

  const setQuoteMax = () => setQuoteAmount(balanceQuote);
  const setQuoteHalf = () => setQuoteAmount(Number((balanceQuote / 2).toFixed(6)));

  const connectWallet = () => {
    // сюда интеграция кошелька
    console.log('Connect wallet click');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 text-white">
      <h1 className="text-center text-4xl font-extrabold">Create Solana Liquidity Pool</h1>
      <p className="mx-auto mt-3 max-w-3xl text-center text-white/70">
        Easily create a Liquidity Pool of any Solana Token. Your token will be available for trading on Raydium,
        Birdeye & DexScreener.
      </p>

      {/* network + amm */}
      <div className="mt-8 flex items-center gap-4">
        <span className="text-white/80">Raydium V4</span>
        <Toggle checked={useRaydium} onChange={setUseRaydium} />
        <span className="text-white/80">CPMM</span>
        <Toggle checked={useCpmm} onChange={setUseCpmm} />
        <a
          className="ml-auto text-sm underline text-white/70 hover:text-white"
          href="https://openbook.dex/#/markets"
          target="_blank"
          rel="noreferrer"
        >
          I already have an OpenBook Market
        </a>

      </div>

      {/* token selects */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <SectionCard title="* Base Token:">
          <Input
            value={baseToken}
            onChange={(e) => setBaseToken(e.target.value)}
            placeholder="Connect your wallet please"
          />
        </SectionCard>
        <SectionCard title="* Quote Token:">
          <Input
            value={quoteToken}
            onChange={(e) => setQuoteToken(e.target.value)}
            placeholder="Connect your wallet please"
          />
        </SectionCard>
      </div>

      {/* advanced options */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-white/80">Advanced Options</span>
        <Toggle checked={advanced} onChange={setAdvanced} />
      </div>

      {/* add liquidity */}
      <h2 className="mt-8 text-xl font-semibold">Add liquidity</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <SectionCard>
          <div className="flex items-center gap-4">
            <NumberInput value={baseAmount} onChange={setBaseAmount} />
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={setBaseMax}
                className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5"
              >
                Max
              </button>
              <button
                type="button"
                onClick={setBaseHalf}
                className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5"
              >
                Half
              </button>
            </div>
            <button type="button" className="ml-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              Base
            </button>
          </div>
          <p className="mt-2 text-xs text-white/60">Balance: {balanceBase.toFixed(2)}</p>
        </SectionCard>

        <SectionCard>
          <div className="flex items-center gap-4">
            <NumberInput value={quoteAmount} onChange={setQuoteAmount} />
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={setQuoteMax}
                className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5"
              >
                Max
              </button>
              <button
                type="button"
                onClick={setQuoteHalf}
                className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5"
              >
                Half
              </button>
            </div>
            <button type="button" className="ml-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              Quote
            </button>
          </div>
          <p className="mt-2 text-xs text-white/60">Balance: {balanceQuote.toFixed(2)}</p>
        </SectionCard>
      </div>

      {/* launch price */}
      <p className="mt-4 text-sm">
        Launch Price:{' '}
        <span className="font-semibold">
          {Number(baseAmount / Math.max(quoteAmount, 1e-9)).toFixed(5)} Base / Quote
        </span>
      </p>

      {/* options */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-40 text-white/80">Set Launch Date</span>
          <Toggle checked={setLaunchDate} onChange={setSetLaunchDate} />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-40 text-white/80">Snipe your Token</span>
          <Toggle checked={snipe} onChange={setSnipe} />
          <span className="text-xs text-white/60">(+0.1 SOL)</span>
        </div>
      </div>

      {/* action */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={connectWallet}
          className="w-60 rounded-2xl bg-[#5B57E8] px-6 py-3 font-medium text-white/95 hover:bg-[#514fdd]"
        >
          Connect Wallet
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-white/60">
        Adding to Liquidity Pool {baseAmount.toFixed(2)} Base + {quoteAmount.toFixed(2)} Quote
      </p>
    </main>
  );
}

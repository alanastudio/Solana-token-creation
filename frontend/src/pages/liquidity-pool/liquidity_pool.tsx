import Toggle  from '../../components/ui/toggle'
import { NumberInput } from '../../components/ui/number_input'
import { Input } from '../../components/ui/input'
import SectionCard from '../../components/ui/section_card'

function LiquidityPool() {
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
        <Toggle checked onChange={() => {}} />
        <span className="text-white/80">CPMM</span>
        <a className="ml-auto text-sm underline text-white/70 hover:text-white" href="#">
          I already have an OpenBook Market
        </a>
      </div>

      {/* token selects */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <SectionCard title="* Base Token:">
          <Input placeholder="Connect your wallet please" leftIcon="search" />
        </SectionCard>
        <SectionCard title="* Quote Token:">
          <Input placeholder="Connect your wallet please" leftIcon="search" />
        </SectionCard>
      </div>

      {/* advanced options */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-white/80">Advanced Options</span>
        <Toggle onChange={() => {}} />
      </div>

      {/* add liquidity */}
      <h2 className="mt-8 text-xl font-semibold">Add liquidity</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <SectionCard>
          <div className="flex items-center gap-4">
            <NumberInput value={1} onChange={() => {}} />
            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5">Max</button>
              <button className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5">Half</button>
            </div>
            <button className="ml-2 rounded-full bg-white/10 px-4 py-2 text-sm">Base</button>
          </div>
          <p className="mt-2 text-xs text-white/60">Balance: 1.00</p>
        </SectionCard>

        <SectionCard>
          <div className="flex items-center gap-4">
            <NumberInput value={1} onChange={() => {}} />
            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5">Max</button>
              <button className="rounded-full border border-white/10 px-4 py-1 text-sm hover:bg-white/5">Half</button>
            </div>
            <button className="ml-2 rounded-full bg-white/10 px-4 py-2 text-sm">Quote</button>
          </div>
          <p className="mt-2 text-xs text-white/60">Balance: 1.00</p>
        </SectionCard>
      </div>

      {/* launch price */}
      <p className="mt-4 text-sm">
        Launch Price: <span className="font-semibold">1.00000 Base / Quote</span>
      </p>

      {/* options */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-40 text-white/80">Set Launch Date</span>
          <Toggle onChange={() => {}} />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-40 text-white/80">Snipe your Token</span>
          <Toggle onChange={() => {}} />
          <span className="text-xs text-white/60">(+0.1 SOL)</span>
        </div>
      </div>

      {/* action */}
      <div className="mt-10 flex justify-center">
        <button className="w-60 rounded-2xl bg-[#5B57E8] px-6 py-3 font-medium text-white/95 hover:bg-[#514fdd]">
          Connect Wallet
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-white/60">
        Adding to Liquidity Pool 1.00 Base + 1.00 Quote
      </p>
    </main>
  )
}

export default LiquidityPool;
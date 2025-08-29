import { useMemo, useState } from 'react'
import Toggle  from '../../components/ui/toggle'
import { NumberInput } from '../../components/ui/number_input'
import { Input } from '../../components/ui/input'
import SectionCard from '../../components/ui/section_card'

type Position = {
  id: string
  pool: string
  baseSymbol: string
  quoteSymbol: string
  baseAmount: number
  quoteAmount: number
  tvlUSD: number
}

function ManageLiquidity() {
  const [search, setSearch] = useState('')
  const [onlyMyPositions, setOnlyMyPositions] = useState(true)
  const [addBase, setAddBase] = useState<number>(0)
  const [addQuote, setAddQuote] = useState<number>(0)
  const [removePct, setRemovePct] = useState<number>(25)

  // demo-данные
  const positions = useMemo<Position[]>(
    () => [
      { id: '1', pool: 'BASE/QUOTE', baseSymbol: 'BASE', quoteSymbol: 'QUOTE', baseAmount: 120, quoteAmount: 95, tvlUSD: 2100 },
      { id: '2', pool: 'SOL/USDC', baseSymbol: 'SOL', quoteSymbol: 'USDC', baseAmount: 4.8, quoteAmount: 525, tvlUSD: 1300 },
    ],
    []
  )

  const filtered = useMemo(
    () =>
      positions.filter(p =>
        [p.pool, p.baseSymbol, p.quoteSymbol].join(' ').toLowerCase().includes(search.toLowerCase())
      ),
    [positions, search]
  )

  function onAddLiquidity() {
    // TODO: вызвать транзакцию добавления ликвидности
    console.log('Add liquidity', { addBase, addQuote })
  }

  function onRemoveLiquidity() {
    // TODO: вызвать транзакцию удаления ликвидности
    console.log('Remove liquidity', { removePct })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 text-white">
      <h1 className="text-center text-4xl font-extrabold">Manage Liquidity</h1>
      <p className="mx-auto mt-3 max-w-3xl text-center text-white/70">
        View your positions, add or remove liquidity in a few clicks.
      </p>

      {/* Фильтры/поиск */}
      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto]">
        <SectionCard>
          <Input
            label="Search pool"
            placeholder="Try SOL/USDC, BASE/QUOTE…"
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
          />
        </SectionCard>

        <SectionCard>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Only my positions</span>
            <Toggle checked={onlyMyPositions} onChange={setOnlyMyPositions} />
          </div>
        </SectionCard>
      </div>

      {/* Таблица позиций */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-6 gap-2 px-4 py-3 text-sm text-white/60">
          <span>Pool</span>
          <span className="text-right">Base</span>
          <span className="text-right">Quote</span>
          <span className="text-right">TVL (USD)</span>
          <span className="text-right">APR</span>
          <span className="text-right">Action</span>
        </div>
        <div className="h-px w-full bg-white/10" />

        {filtered.length === 0 ? (
          <div className="p-6 text-center text-white/50">No positions found</div>
        ) : (
          filtered.map(row => (
            <div key={row.id} className="grid grid-cols-6 gap-2 px-4 py-4 text-sm items-center border-t border-white/10">
              <div className="font-medium">{row.pool}</div>
              <div className="text-right">{row.baseAmount} {row.baseSymbol}</div>
              <div className="text-right">{row.quoteAmount} {row.quoteSymbol}</div>
              <div className="text-right">${row.tvlUSD.toLocaleString()}</div>
              <div className="text-right text-emerald-400">—{/* подставь APR */}</div>
              <div className="text-right">
                <a href="#liquidity-actions" className="rounded-full border border-white/10 px-3 py-1 hover:bg-white/5">
                  Manage
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Блоки Add / Remove */}
      <div id="liquidity-actions" className="mt-12 grid gap-6 md:grid-cols-2">
        {/* ADD */}
        <SectionCard title="Add liquidity">
          <div className="space-y-4">
            <NumberInput label="Base amount" value={addBase} onChange={setAddBase} min={0} step={0.01} />
            <NumberInput label="Quote amount" value={addQuote} onChange={setAddQuote} min={0} step={0.01} />
            <button
              onClick={onAddLiquidity}
              className="w-full rounded-2xl bg-[#5B57E8] px-6 py-3 font-medium text-white/95 hover:bg-[#514fdd]"
            >
              Add Liquidity
            </button>
          </div>
        </SectionCard>

        {/* REMOVE */}
        <SectionCard title="Remove liquidity">
          <div className="space-y-4">
            <NumberInput
              label="Remove %"
              value={removePct}
              onChange={setRemovePct}
              min={1}
              max={100}
              step={1}
              hint="You can withdraw partially"
            />
            <div className="flex gap-2">
              {[25, 50, 75, 100].map(p => (
                <button
                  key={p}
                  onClick={() => setRemovePct(p)}
                  className={[
                    'rounded-full border border-white/10 px-4 py-2 text-sm',
                    removePct === p ? 'bg-white/10' : 'hover:bg-white/5'
                  ].join(' ')}
                >
                  {p}%
                </button>
              ))}
            </div>
            <button
              onClick={onRemoveLiquidity}
              className="w-full rounded-2xl bg-white/10 px-6 py-3 font-medium text-white hover:bg-white/15"
            >
              Remove Liquidity
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Хелп-текст */}
      <p className="mt-6 text-center text-sm text-white/50">
        Tip: connect your wallet to see personal positions and interact with pools.
      </p>
    </main>
  )
}

export default ManageLiquidity;
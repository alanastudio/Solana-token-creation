import { Link, NavLink } from 'react-router-dom'
import ConnectWallet from '../ui/connect_wallet'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/create-token', label: 'Create Token' },
  { to: '/liquidity-pool', label: 'Liquidity Pool' },
  { to: '/manage-liquidity', label: 'Manage Liquidity' },
  { to: '/support', label: 'Support' }
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0f1220]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-white lowercase">
            pornhub
          </span>
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
        </Link>

        {/* nav pill */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10 shadow-inner">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-2 text-sm font-semibold rounded-full transition',
                      'text-slate-200 hover:text-white',
                      isActive ? 'bg-white/10 text-white' : 'bg-transparent'
                    ].join(' ')
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* wallet button */}
        <div className="shrink-0">
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}

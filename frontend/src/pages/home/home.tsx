import { Link } from "react-router-dom";

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.07]">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-inset ring-indigo-400/30">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-white/70">{desc}</p>
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:scale-125" />
    </div>
  );
}

function Step({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
        {number}
      </div>
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="mt-2 text-white/70">{desc}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-10 text-white">
      {/* декоративные градиенты */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-20%] top-[-10%] h-80 w-80 rounded-full bg-indigo-600/20 blur-[90px]" />
        <div className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-violet-500/20 blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-[90px]" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Live on Solana Devnet
        </span>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
          Launch tokens & liquidity pools
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
            in minutes on Solana
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Создавайте токены, поднимайте ликвидность и выходите в листинги Raydium
          и DEX-агрегаторов за пару кликов. Без кода. Без боли.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/create-token"
            className="rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white transition hover:bg-indigo-500/90"
          >
            Create Token
          </Link>
          <Link
            to="/liquidity-pool"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:border-white/25 hover:bg-white/10"
          >
            Create Liquidity Pool
          </Link>
          <a
            href="https://birdeye.so/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/5"
          >
            Explore markets →
          </a>
        </div>

        {/* мини-статы */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-sm text-white/70 max-md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-semibold text-white">0.0001</div>
            <div>SOL base fee</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-semibold text-white">~2 min</div>
            <div>to launch</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 max-md:col-span-2">
            <div className="text-2xl font-semibold text-white">Raydium V4</div>
            <div>CPMM ready</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">Почему мы</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">
          Упор на UX, безопасность транзакций и быструю интеграцию с экосистемой
          Solana.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                <path
                  fill="currentColor"
                  d="M12 2l3 7h7l-5.7 4.1L18.9 21 12 16.9 5.1 21l2.6-7.9L2 9h7z"
                />
              </svg>
            }
            title="One-click Launch"
            desc="Мастер создания токена и пула с понятными шагами и проверками."
          />
          <FeatureCard
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                <path
                  fill="currentColor"
                  d="M12 1a11 11 0 100 22A11 11 0 0012 1zm1 6v6l5 3-.8 1.4L11 13V7h2z"
                />
              </svg>
            }
            title="Fast & Affordable"
            desc="Оптимизированные транзакции и низкие комиссии в сети Solana."
          />
          <FeatureCard
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                <path
                  fill="currentColor"
                  d="M12 3l9 6-9 6-9-6 9-6zm0 8.2l5.7-3.8L12 3.6 6.3 7.4 12 11.2zM3 13.5l9 6 9-6V18l-9 6-9-6v-4.5z"
                />
              </svg>
            }
            title="Raydium-ready"
            desc="Пулы совместимы с Raydium V4 и видны на DEX-агрегаторах."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">Как это работает</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Step
            number="1"
            title="Создайте токен"
            desc="Задайте имя, тикер, количество и метаданные. Мы подготовим и отправим транзакции."
          />
          <Step
            number="2"
            title="Откройте пул ликвидности"
            desc="Выберите базовый/котируемый токены и добавьте стартовую ликвидность."
          />
          <Step
            number="3"
            title="Запустите и делитесь"
            desc="Получите адреса, ссылки на Raydium/Birdeye и начните продвижение."
          />
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/create-token"
            className="rounded-xl bg-indigo-500 px-6 py-3 font-medium transition hover:bg-indigo-500/90"
          >
            Start now
          </Link>
          <Link
            to="/liquidity-pool"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium transition hover:border-white/25 hover:bg-white/10"
          >
            Create Pool
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mt-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 text-center">
          <h3 className="text-xl font-semibold">Готовы к публичному запуску?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-white/70">
            Поддерживаем devnet сейчас и testnet/mainnet — по запросу. Напишите нам,
            если нужен кастомный флоу или аудит.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="mailto:team@union.example"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm transition hover:border-white/25 hover:bg-white/10"
            >
              Contact team
            </a>
            <Link
              to="/liquidity-pool"
              className="rounded-xl bg-indigo-500 px-6 py-3 font-medium transition hover:bg-indigo-500/90"
            >
              Launch Pool
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">FAQ</h2>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4">
          <details className="rounded-xl border border-white/10 bg-white/5 p-4">
            <summary className="cursor-pointer select-none font-medium">
              Сколько стоит создание?
            </summary>
            <p className="mt-2 text-white/70">
              Комиссия сети + небольшая сервисная плата, которые вы увидите
              перед подтверждением транзакции.
            </p>
          </details>
          <details className="rounded-xl border border-white/10 bg-white/5 p-4">
            <summary className="cursor-pointer select-none font-medium">
              Где будет доступна торговля токеном?
            </summary>
            <p className="mt-2 text-white/70">
              Пулы создаются под Raydium V4, так что их видят Raydium, Birdeye,
              DexScreener и другие агрегаторы.
            </p>
          </details>
          <details className="rounded-xl border border-white/10 bg-white/5 p-4">
            <summary className="cursor-pointer select-none font-medium">
              Нужен ли код или нода?
            </summary>
            <p className="mt-2 text-white/70">
              Нет. Подключаете кошелёк — и проходите мастер шаг за шагом.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}

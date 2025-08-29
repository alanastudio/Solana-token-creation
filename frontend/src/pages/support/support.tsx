import React, { useState } from "react";
import { Link } from "react-router-dom";

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
  {
    q: "Как создать ликвидити-пул?",
    a: "Откройте «Liquidity Pool», выберите Base/Quote токены, введите суммы и подтвердите транзакцию в кошельке.",
  },
  {
    q: "Какие сети поддерживаются?",
    a: "Сейчас — Solana (Raydium V4 / CPMM). Мы добавляем больше сетей по мере готовности.",
  },
  {
    q: "Почему транзакция отклонена?",
    a: "Проверьте баланс, лимиты кошелька и загрузку RPC. Повторите позже или смените RPC.",
  },
];

export default function Support() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-white">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold">Support</h1>
        <p className="mt-3 text-white/70">
          Наши гайды, ответы на частые вопросы и форма для связи.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/create-token"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Гайд: Создать токен
          </Link>
          <Link
            to="/liquidity-pool"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Гайд: Liquidity Pool
          </Link>
          <a
            className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            href="https://docs.example.com"
            target="_blank"
            rel="noreferrer"
          >
            Документация
          </a>
        </div>
      </section>

      {/* Cards */}
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <SupportCard
          title="Статус сервисов"
          desc="Проверить состояние RPC и индексации."
          actionLabel="Status Page"
          href="https://status.example.com"
        />
        <SupportCard
          title="Комьюнити"
          desc="Задайте вопрос в нашем Discord."
          actionLabel="Discord"
          href="https://discord.gg/yourinvite"
        />
        <SupportCard
          title="Безопасность"
          desc="Сообщить о проблеме безопасности."
          actionLabel="security@yourapp.xyz"
          href="mailto:security@yourapp.xyz"
        />
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <button
                key={idx}
                className="w-full text-left px-4 py-4 focus:outline-none"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-base font-medium">{item.q}</span>
                  <span
                    className={[
                      "inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-sm transition",
                      isOpen ? "rotate-45" : "",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
                {isOpen && (
                  <p className="mt-2 text-sm text-white/70">{item.a}</p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Contact form (без бэкенда; просто логирует) */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Написать в поддержку</h2>
        <p className="mt-2 text-white/70 text-sm">
          Или напишите нам на <a href="mailto:support@yourapp.xyz" className="underline">support@yourapp.xyz</a>
        </p>
        <ContactForm />
      </section>
    </main>
  );
}

function SupportCard({
  title,
  desc,
  href,
  actionLabel,
}: {
  title: string;
  desc: string;
  href: string;
  actionLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="mt-4 inline-block rounded-xl bg-[#5B57E8] px-4 py-2 text-sm hover:bg-[#514fdd]"
      >
        {actionLabel}
      </a>
    </div>
  );
}

function ContactForm() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, topic, message });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200">
        Спасибо! Мы получили ваше обращение.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
      <div className="md:col-span-1">
        <label className="text-sm text-neutral-300">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-500"
          placeholder="you@mail.xyz"
        />
      </div>
      <div className="md:col-span-1">
        <label className="text-sm text-neutral-300">Тема</label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-500"
        >
          <option>General</option>
          <option>Billing</option>
          <option>Security</option>
          <option>Integrations</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="text-sm text-neutral-300">Сообщение</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-500"
          placeholder="Коротко опишите проблему…"
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full rounded-2xl bg-[#5B57E8] px-6 py-3 font-medium hover:bg-[#514fdd]"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}

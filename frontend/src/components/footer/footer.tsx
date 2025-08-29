function Footer() {
  return (
    <footer className="mt-auto px-6 py-8 border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-sm">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        
        {/* Брендинг */}
        <div>
          <h3 className="text-white font-semibold text-lg">Solana Token Creator</h3>
          <p className="text-neutral-500 mt-2">
            Create tokens & liquidity pools on Solana with ease 🚀
          </p>
        </div>

        {/* Навигация */}
        <div className="flex flex-col gap-2">
          <span className="text-neutral-300 font-medium">Explore</span>
          <a href="/create-token" className="hover:text-white">Create Token</a>
          <a href="/liquidity-pool" className="hover:text-white">Liquidity Pool</a>
          <a href="/" className="hover:text-white">Home</a>
        </div>

        {/* Контакты / Соцсети */}
        <div className="flex flex-col gap-3">
          <span className="text-neutral-300 font-medium">Connect</span>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="mailto:egorvelikijkuzma@yandex.com" className="hover:text-white">egorvelikijkuzma@yandex.com</a>
        </div>
      </div>

      <div className="text-center text-neutral-500 text-xs mt-8">
        © {new Date().getFullYear()} Solana Token Creator · All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

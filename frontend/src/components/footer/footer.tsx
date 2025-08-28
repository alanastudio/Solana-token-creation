function Footer() {
  return (
    <footer className="px-4 py-6 border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-sm">
      <div className="max-w-5xl mx-auto">
        © {new Date().getFullYear()} — Devnet demo. Network fees оплачиваются отдельно.
      </div>
    </footer>
  );
}

export default Footer;
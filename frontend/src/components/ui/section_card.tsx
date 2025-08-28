import React from "react";

export default function SectionCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6">
      {title && <h3 className="text-neutral-200 font-semibold mb-3">{title}</h3>}
      {children}
    </section>
  );
}

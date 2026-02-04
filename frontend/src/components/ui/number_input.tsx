type Props = {
  label?: string;
  value: number | string;
  onChange: (v: number) => void;
  min?: number; max?: number; step?: number;
  hint?: string;
};

export function NumberInput({ label, value, onChange, min, max, step = 1, hint }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm text-neutral-300">
          <span className="text-rose-400 mr-1">*</span>{label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max((Number(value) || 0) - step, min ?? -Infinity))}
          className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
        >−</button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min} max={max} step={step}
          className="w-full rounded-lg bg-neutral-900/80 border border-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min((Number(value) || 0) + step, max ?? Infinity))}
          className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
        >+</button>
      </div>
      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

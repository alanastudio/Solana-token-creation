
type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export default function Toggle({ checked, onChange, label, disabled }: Props) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={[
          "relative w-11 h-6 rounded-full transition",
          checked ? "bg-emerald-500/90" : "bg-neutral-700",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition",
            checked ? "left-5" : "left-0.5",
          ].join(" ")}
        />
      </div>
      {label && <span className="text-sm text-neutral-300">{label}</span>}
    </label>
  );
}

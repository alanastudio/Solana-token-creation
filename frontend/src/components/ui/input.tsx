import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  requiredMark?: boolean;
};
export function Input({ label, hint, requiredMark = true, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-neutral-300">
        {requiredMark && <span className="text-rose-400 mr-1">*</span>}
        {label}
      </label>
      <input
        {...rest}
        className="w-full rounded-lg bg-neutral-900/80 border border-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-indigo-500"
      />
      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

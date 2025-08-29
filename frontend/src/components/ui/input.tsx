import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  requiredMark?: boolean;
  leftIcon?: 'search' | React.ReactNode;
};

export function Input({ label, hint, requiredMark = true, leftIcon, ...rest }: Props) {
  const withIcon = Boolean(leftIcon);
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm text-neutral-300">
          {requiredMark && <span className="text-rose-400 mr-1">*</span>}
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
            {leftIcon === 'search' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : leftIcon}
          </span>
        )}
        <input
          {...rest}
          className={`w-full rounded-lg bg-neutral-900/80 border border-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-indigo-500 ${withIcon ? 'pl-10' : ''}`}
        />
      </div>

      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}
export default Input;

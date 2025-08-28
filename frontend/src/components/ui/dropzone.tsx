import React, { useCallback, useRef, useState } from "react";

type Props = {
  onFile: (f: File) => void;
};

export default function Dropzone({ onFile }: Props) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={[
        "rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition",
        over ? "border-indigo-500 bg-indigo-500/10" : "border-neutral-800 bg-neutral-900/60",
      ].join(" ")}
    >
      <div className="text-neutral-400">
        <div className="text-2xl mb-2">⬆️</div>
        <div className="text-sm">Drag and drop here to upload</div>
        <div className="text-xs mt-1">.png, .jpg 1000x1000 px</div>
      </div>
      <input
        type="file"
        accept="image/png,image/jpeg"
        ref={inputRef}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />
    </div>
  );
}

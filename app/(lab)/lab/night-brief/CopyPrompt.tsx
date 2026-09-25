"use client";

import { useState } from "react";

export function CopyPrompt({ text }: { text: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied. Paste it into your AI chat, then add your notes.");
    } catch {
      setStatus("Select and copy the prompt below, or download the text file.");
    }
  }
  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer rounded-lg border border-accent px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Copy the prompt
      </button>
      <p role="status" className="mt-3 text-sm text-muted">{status}</p>
    </div>
  );
}

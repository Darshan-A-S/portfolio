export const loaderDoc = {
  intro:
    "A status phrase with a light sweep and growing dots. Free-runs through phrases, or pins to a background process via `current`.",
  demoCode: `import { Loader } from "dasregistry"

export function LoaderDemo() {
  return <Loader />
}`,

  installCli: `npm install dasregistry`,

  installStyle: `import "dasregistry/style.css";`,

  manualDeps: "The component has no dependencies beyond `react` and `react-dom`.",

  sourceCode: `import { useEffect, useState } from "react";

const DEFAULT_PHRASES = [
  "Thinking",
  "Searching",
  "Reading",
  "Reasoning",
  "Reviewing",
  "Drafting",
  "Editing",
  "Writing",
  "Coding",
  "Debugging",
  "Refactoring",
  "Analyzing",
  "Generating",
  "Polishing",
];

export interface LoaderProps {
  phrases?: string[];
  interval?: number;
  current?: string;
}

export function Loader({ phrases = DEFAULT_PHRASES, interval = 4000, current }: LoaderProps) {
  const [i, setI] = useState(0);
  const [dots, setDots] = useState(3);

  useEffect(() => {
    if (current !== undefined) return;
    const t = setInterval(() => setI((x) => (x + 1) % phrases.length), interval);
    return () => clearInterval(t);
  }, [phrases.length, interval, current]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);

  const text = current ?? phrases[i];

  return (
    <div className="das-loader" role="status" aria-live="polite">
      <span className="das-loader-phrase">
        <span className="das-loader-shine" aria-hidden="true">
          {text}
          {".".repeat(dots)}
        </span>
        {text}
        {".".repeat(dots)}
      </span>
    </div>
  );
}`,

  usageImport: `import { Loader } from "dasregistry"
import "dasregistry/style.css";`,

  usageExample: `<Loader />                        // free-run cycling

<Loader phrases={["Compiling", "Linking", "Optimizing"]} interval={2000} />

<Loader current={phase} />       // pinned to a background process`,

  usageNote:
    "Free-run mode (no `current`) cycles through `phrases` every `interval` ms. Pass `current` to pin the text and disable cycling. Dots grow every 400ms; with `prefers-reduced-motion` they hold as static `...`.",
  props: [
    {
      name: "phrases",
      type: "string[] | undefined",
      description: "Status words to cycle through in free-run mode. Defaults to a built-in set.",
    },
    {
      name: "interval",
      type: "number | undefined",
      description: "Milliseconds between phrase swaps in free-run mode. Defaults to 4000.",
    },
    {
      name: "current",
      type: "string | undefined",
      description: "Pin a single phrase; disables cycling so the loader mirrors your background process. Updates instantly.",
    },
  ],

  behavior: [
    "Renders `role=\"status\"` + `aria-live=\"polite\"`; the shine overlay is `aria-hidden`.",
    "`current` pins the text and disables the cycle timer.",
    "Dots grow every 400ms; static `...` under `prefers-reduced-motion`.",
  ],

  updated: "August 13, 2026",
}
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Loader } from "dasregistry"
import "dasregistry/style.css"
import { CodeBlock } from "../components/code-block.jsx"
import { CodeBlockCommand, convertNpmCommand } from "../components/code-block-command.jsx"
import { ComponentNav } from "../components/component-nav.jsx"
import { InlineCode } from "../components/inline-code.jsx"
import { loaderDoc as doc } from "../data/loader-doc"

function Section({ title, children }) {
  return (
    <section className="border-b border-[color:var(--color-border)] px-4 py-6">
      <h2 className="mb-4 text-[18px] font-bold text-[var(--color-text)]">{title}</h2>
      {children}
    </section>
  )
}

function StepLabel({ n, children }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border)] font-mono text-[11px] text-[var(--color-text-muted)]">
        {n}
      </span>
      <span className="text-[14px] font-medium text-[var(--color-text)]">{children}</span>
    </div>
  )
}

function DemoPreview({ children }) {
  return (
    <div className="mb-3 flex min-h-[90px] items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {children}
    </div>
  )
}

function Mono({ children }) {
  return <code className="font-mono text-[0.9em] text-[var(--color-text)]">{children}</code>
}

export default function LoaderDoc() {
  const [tab, setTab] = useState("cli")

  const tabBtn = (active) =>
    `px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
      active
        ? "bg-[var(--color-badge-bg)] text-[var(--color-text)]"
        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
    }`

  return (
    <article className="flex flex-1 flex-col px-[8px] sm:px-0">
        <div className="border-b border-[color:var(--color-border)]">
          <div className="mx-auto flex max-w-[768px] items-center justify-between gap-4 border-x border-[color:var(--color-border)] px-4 py-2">
            <Link
              to="/components"
              className="inline-flex items-center gap-1 text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <ArrowLeft className="size-4" />
              Components
            </Link>
            <ComponentNav slug="loader" />
          </div>
        </div>

        <div className="border-b border-[color:var(--color-border)]">
          <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-6">
            <h1 className="text-[26px] font-bold leading-snug text-[var(--color-text)]">Loader</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
              Claude-style status indicator with typewriter text. Published in <Mono>dasregistry</Mono>.
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[768px] flex-1 flex-col border-x border-b border-[color:var(--color-border)]">
        <Section title="Demo">
          <p className="mb-3 text-[13px] leading-relaxed text-[var(--color-text-muted)]"><InlineCode text={doc.intro} /></p>
          <DemoPreview>
            <Loader />
          </DemoPreview>
          <CodeBlock title="loader-demo.tsx" code={doc.demoCode} />
        </Section>

        <Section title="Installation">
          <div className="mb-4 inline-flex overflow-hidden rounded-lg border border-[color:var(--color-border)]">
            <button type="button" onClick={() => setTab("cli")} className={tabBtn(tab === "cli")}>
              CLI
            </button>
            <button type="button" onClick={() => setTab("manual")} className={tabBtn(tab === "manual")}>
              Manual
            </button>
          </div>

          {tab === "cli" ? (
            <div className="flex flex-col gap-4">
              <CodeBlockCommand prompt="Install the Loader component" {...convertNpmCommand("npm install dasregistry")} />
              <p className="text-[13px] text-[var(--color-text-muted)]">
                Import the stylesheet (Claude-style status: typewriter font, light sweep, adapts to light/dark mode):
              </p>
              <CodeBlock title="main.tsx" code={doc.installStyle} />
            </div>
          ) : (
            <ol className="space-y-6">
              <li>
                <StepLabel n={1}>Install the package</StepLabel>
                <CodeBlock title="terminal" language="bash" code={doc.installCli} />
                <p className="mt-2 text-[13px] text-[var(--color-text-muted)]"><InlineCode text={doc.manualDeps} /></p>
              </li>
              <li>
                <StepLabel n={2}>Import the component and stylesheet</StepLabel>
                <CodeBlock title="main.tsx" code={doc.installStyle} />
              </li>
              <li>
                <StepLabel n={3}>Here is the source, in case you want to vendor it</StepLabel>
                <CodeBlock title="components/loader.tsx" code={doc.sourceCode} expandable />
              </li>
              <li>
                <StepLabel n={4}>Update the import paths to match your project setup</StepLabel>
              </li>
            </ol>
          )}
        </Section>

        <Section title="Usage">
          <div className="flex flex-col gap-4">
            <CodeBlock title="import" code={doc.usageImport} />
            <CodeBlock title="example" code={doc.usageExample} />
            <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]"><InlineCode text={doc.usageNote} /></p>
          </div>
        </Section>

        <Section title="API reference">
          <h3 className="mb-3 text-[14px] font-bold text-[var(--color-text)]">LoaderProps</h3>
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-[color:var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Type</th>
                <th className="py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.props.map((p) => (
                <tr key={p.name} className="border-b border-[color:var(--color-border)] align-top last:border-b-0">
                  <td className="py-2.5 pr-4 font-mono font-medium text-[var(--color-text)]">{p.name}</td>
                  <td className="py-2.5 pr-4 font-mono text-[var(--color-text-muted)]">{p.type}</td>
                  <td className="py-2.5 text-[var(--color-text-muted)]">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Behavior">
          <ul className="list-disc space-y-1.5 pl-5 text-[13px] text-[var(--color-text)]">
            {doc.behavior.map((b, i) => (
              <li key={i}><InlineCode text={b} /></li>
            ))}
          </ul>
        </Section>

        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-4 text-[11px] text-[var(--color-text-muted)] sm:text-[12px]">
          <span>Last updated on {doc.updated}</span>
          <span>* Em — dashes in this page are generated by me</span>
        </div>
      </div>
    </article>
  )
}
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { DatePicker } from "dasregistary"
import "dasregistary/style.css"
import { CodeBlock } from "../components/code-block.jsx"
import { CodeBlockCommand, convertNpmCommand } from "../components/code-block-command.jsx"
import { datepickerDoc as doc } from "../data/datepicker-doc"

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
    <div className="mb-3 flex justify-center rounded-lg border border-[color:var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {children}
    </div>
  )
}

function Mono({ children }) {
  return <code className="font-mono text-[0.9em] text-[var(--color-text)]">{children}</code>
}

export default function DatePickerDoc() {
  const [dueDate, setDueDate] = useState("2026-08-10")
  const [date, setDate] = useState("")
  const [tab, setTab] = useState("cli")

  const tabBtn = (active) =>
    `px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
      active
        ? "bg-[var(--color-badge-bg)] text-[var(--color-text)]"
        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
    }`

  return (
    <article className="px-[8px] sm:px-0">
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-2">
          <Link
            to="/components"
            className="inline-flex items-center gap-1 text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <ArrowLeft className="size-4" />
            Components
          </Link>
        </div>

        <div className="border-b border-[color:var(--color-border)] px-4 py-6">
          <h1 className="text-[26px] font-bold leading-snug text-[var(--color-text)]">Date Picker</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
            Calendar popover for picking a single date. Controlled via <Mono>value</Mono>/
            <Mono>onChange</Mono> in <Mono>YYYY-MM-DD</Mono>, with label, error, and disabled states. Published in{" "}
            <Mono>dasregistary</Mono>.
          </p>
        </div>

        <Section title="Demo">
          <DemoPreview>
            <DatePicker label="Due date" value={dueDate} onChange={setDueDate} />
          </DemoPreview>
          <CodeBlock title="date-picker-demo.tsx" code={doc.demoCode} />

          <div className="mt-8">
            <DemoPreview>
              <div className="flex w-full max-w-[280px] flex-col gap-4">
                <DatePicker label="Trip date" value={date} onChange={setDate} />
                <DatePicker
                  label="Birthday"
                  value={date}
                  onChange={setDate}
                  error={date ? undefined : "This field is required"}
                />
                <DatePicker label="Expires" value={date} onChange={setDate} disabled />
              </div>
            </DemoPreview>
            <CodeBlock title="date-picker-states.tsx" code={doc.statesCode} />
          </div>
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
              <CodeBlockCommand prompt="Install the DatePicker component" {...convertNpmCommand("npm install dasregistary")} />
              <p className="text-[13px] text-[var(--color-text-muted)]">
                Import the stylesheet (Nothing Phone theme: black screen, dot-matrix font, red accents):
              </p>
              <CodeBlock title="main.tsx" code={doc.installStyle} />
            </div>
          ) : (
            <ol className="space-y-6">
              <li>
                <StepLabel n={1}>Install the package</StepLabel>
                <CodeBlock title="terminal" code={doc.installCli} />
                <p className="mt-2 text-[13px] text-[var(--color-text-muted)]">{doc.manualDeps}</p>
              </li>
              <li>
                <StepLabel n={2}>Import the component and stylesheet</StepLabel>
                <CodeBlock title="main.tsx" code={doc.installStyle} />
              </li>
              <li>
                <StepLabel n={3}>Here is the source, in case you want to vendor it</StepLabel>
                <CodeBlock title="components/date-picker.tsx" code={doc.sourceCode} />
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
            <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">{doc.usageNote}</p>
          </div>
        </Section>

        <Section title="API reference">
          <h3 className="mb-3 text-[14px] font-bold text-[var(--color-text)]">DatePickerProps</h3>
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
              <li key={i}>{b}</li>
            ))}
          </ul>
        </Section>

        <div className="px-4 py-4 text-[12px] text-[var(--color-text-muted)]">Last updated on {doc.updated}</div>
      </div>
    </article>
  )
}

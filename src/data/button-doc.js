export const buttonDoc = {
  intro:
    "Wrapper around the native `<button>` with two visual variants. Inherits all native button behavior (disabled, focus, keyboard) for free.",

  demoCode: `import { Button } from "dasregistry"

export function ButtonDemo() {
  return <Button variant="primary">Save changes</Button>
}`,

  installCli: `npm install dasregistry`,

  installStyle: `import "dasregistry/style.css";`,

  manualDeps: "The component has no dependencies beyond `react` and `react-dom`.",

  sourceCode: `import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={\`das-btn das-btn-\${variant} \${className ?? ""}\`.trim()} {...props} />;
}`,

  usageImport: `import { Button } from "dasregistry"
import "dasregistry/style.css";`,

  usageExample: `<Button variant="secondary" onClick={() => setSubmitting(false)}>
  Cancel
</Button>`,

  usageNote:
    "`variant` switches between the solid primary style and the dashed secondary style. Everything else passes straight through to the native `<button>`: `onClick`, `type`, `disabled`, `aria-label`, `className`, and so on.",

  props: [
    {
      name: "variant",
      type: '"primary" | "secondary"',
      description: "Visual style: primary (solid) or secondary (dashed). Defaults to primary.",
    },
  ],

  behavior: [
    "Sits on top of the native <button>, so keyboard focus, Enter/Space activation, disabled, and form submission work out of the box.",
    "Hovering turns the border and text accent red; pressing nudges the button down 1px.",
    'variant defaults to "primary" when omitted.',
    "Styles come from the shared stylesheet — load dasregistry/style.css once per app.",
  ],

  updated: "August 11, 2026",
}

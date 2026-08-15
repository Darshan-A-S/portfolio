export const buttonDoc = {
  intro: "Wrapper around the native `<button>` with two visual variants; all native behavior comes free.",

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

  usageNote: "`variant` switches between the solid primary and dashed secondary styles; everything else passes through to the native `<button>`.",

  props: [
    {
      name: "variant",
      type: '"primary" | "secondary"',
      description: "Visual style: primary (solid) or secondary (dashed). Defaults to primary.",
    },
  ],

  behavior: [
    "Keyboard focus, Enter/Space activation, disabled, and form submission work out of the box.",
    "Hover turns the border and text accent red; pressing nudges the button down 1px.",
    '`variant` defaults to "primary" when omitted.',
  ],

  updated: "August 11, 2026",
}

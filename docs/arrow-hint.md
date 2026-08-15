# ArrowHint — Reusable Arrow + Text Hint

`src/components/arrow-hint.jsx` renders a curved arrow with a label (e.g. "hover to play" / "tap to play"), pinned to the first video frame on the Otherside section.

Used twice in `src/components/video-editing.jsx` inside `VideoHintOverlays()`:

- **Desktop hint** — `className="items-start sm:inline-flex"` (shows ≥768px)
- **Mobile hint** — `className="max-sm:inline-flex"` (shows <768px)

Adjust each instance independently.

## Position (where the hint sits)

| Prop | What it does | Example |
|---|---|---|
| `style={{ top, left }}` | Anchor point of the box relative to the first video frame | `top: "50px", left: "-55px"` |
| `style={{ right }}` | Anchor from the right edge instead of `left` (mobile) | `right: "0.5rem"` |
| `className="sm:inline-flex"` | Show on desktop only | (default show-class if you remove it is `hidden`) |
| `className="max-sm:inline-flex"` | Show on mobile only | |

## Arrow

| Prop | What it does | Example |
|---|---|---|
| `direction` | Arrow head points `up` / `right` / `down` / `left` | `direction="down"` |
| `tilt` | Extra rotation of just the arrow (deg) | `tilt={18}` |
| `flip` | Mirror the arrow horizontally | `flip` |
| `arrowWidth` / `arrowHeight` | Arrow size | `arrowWidth={24}` |

## Text

| Prop | What it does | Example |
|---|---|---|
| `text` | Label text; `\n` for two lines | `text="tap to play"` |
| `textSide` | Text above or below the arrow | `textSide="above"` |
| `textGap` | Vertical gap between arrow and text | `textGap={20}` |
| `textSize` | Font size | `textSize={14}` |
| `textNudge` | Horizontal offset from centered (px) | `textNudge={-10}` |
| `textTilt` | Rotate just the text (deg) | `textTilt={6}` |
| `color` | Text + arrow color | `color="var(--color-text-muted)"` |

The text is always centered on the arrow; `textNudge` / `textTilt` fine-tune from there.

## Example

```jsx
<ArrowHint
  className="max-sm:inline-flex"
  style={{ top: "0.5rem", right: "0.5rem" }}
  text="tap to play"
  direction="down"
  textSide="above"
  textGap={20}
  textSize={14}
  arrowWidth={15}
  arrowHeight={19}
/>
```

## Notes

- `direction="down"` internally means `rotate(180deg)` — the rotation is applied to the arrow SVG only, never to the text, so text never flips upside down.
- Use `textTilt` (not `direction`) to tilt the text.
- `pointer-events-none` is on by default, so hints never block video clicks.
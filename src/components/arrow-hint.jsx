const ARROW_PATH =
  "M308.05 239.595c29.655-36.015 70.851-93.178 101.838-124.165 4.628-7.711 6.07-16.394 4.501-24.453-1.608-8.3-6.323-15.885-13.944-21.102l-2.6-1.589L262.878 0l-11.746 23.296c12.434 6.292 93.43 46.069 123.485 61.863-113.328 8.43-202.581 50.997-265.629 119.244C39.366 279.759 2.091 386.158 0 512.16l26.047.411c1.984-119.465 36.915-219.904 102.141-290.501 59.271-64.156 143.951-103.929 252.057-111.185l-92.32 112.157 20.125 16.553z";

const DIRECTIONS = {
  up: 0,
  right: 90,
  down: 180,
  left: -90,
};

export default function ArrowHint({
  text,
  direction = "right",
  flip = false,
  tilt = 0,
  textSide = "below",
  textSize = 20,
  textGap = 4,
  textNudge = 0,
  textTilt = 0,
  arrowWidth = 24,
  arrowHeight = 30,
  color = "var(--color-text-muted)",
  inline = false,
  className = "",
  style,
}) {
  const label = (
    <span
      className="block whitespace-nowrap text-center leading-none"
      style={{
        position: "absolute",
        left: "50%",
        transform: `translateX(calc(-50% + ${textNudge}px)) rotate(${textTilt}deg)`,
        fontFamily: "'ArrowFont', sans-serif",
        color,
        fontSize: textSize,
        ...(textSide === "above"
          ? { bottom: `calc(100% + ${textGap}px)` }
          : { top: `calc(100% + ${textGap}px)` }),
      }}
    >
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </span>
  );

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none ${inline ? "inline-block" : "absolute z-20 hidden"} ${className}`}
      style={{ color: "var(--color-text-muted)", ...style }}
    >
      <span
        className="relative block"
        style={{ width: arrowWidth, height: arrowHeight }}
      >
        {textSide === "above" && label}
        <svg
          style={{
            width: arrowWidth,
            height: arrowHeight,
            transform: `rotate(${DIRECTIONS[direction] + tilt}deg) scaleX(${flip ? -1 : 1})`,
            transformOrigin: "top center",
            display: "block",
          }}
          viewBox="0 0 415 512.571"
          fill="currentColor"
        >
          <path fillRule="nonzero" d={ARROW_PATH} />
        </svg>
        {textSide === "below" && label}
      </span>
    </span>
  );
}
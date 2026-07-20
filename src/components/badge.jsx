const Badge = ({ text }) => {
  return (
    <span className="inline-block whitespace-nowrap rounded-lg border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] px-2.5 py-1 text-xs font-normal leading-none text-[var(--color-badge-text)]">
      {text}
    </span>
  );
};

export default Badge;

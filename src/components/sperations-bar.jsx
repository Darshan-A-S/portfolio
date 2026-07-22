const Seperation_bar = () => {
  return (
    <div>
      <div
        className="relative h-6 w-full overflow-hidden border-b border-[color:var(--color-border)]"
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, var(--color-border) 0, var(--color-border) 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px',
          opacity: 0.56,
        }}
      />
    </div>
  )
}

export default Seperation_bar

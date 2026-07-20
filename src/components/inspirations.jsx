import UnderlinedText from './underlinetext'

const Inspirations = () => {
  return (
    <div className="border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-6 text-center text-[13px] text-[var(--color-text-secondary)]">
        <p>
          Crafted by <UnderlinedText text="Darshan" /> with love ❤️
        </p>
        <p className="mt-1">
          Inspired by <a href="https://chanhdai.com" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-2 hover:text-[var(--color-text)]">chanhdai.com</a>
        </p>
      </div>
    </div>
  )
}

export default Inspirations

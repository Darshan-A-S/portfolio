import linkedin from "./../assets/linkedin.jpg"
import github from "./../assets/github.webp"

const Socials = () => {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[5px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Social Links
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="grid grid-cols-2">
          <a
            href="https://www.linkedin.com/in/darshan-a-s-9a0350268/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 border-r border-[color:var(--color-border)] px-4 py-4 transition-colors hover:bg-[var(--color-hover-bg)]"
          >
            <img src={linkedin} className="h-10 w-10 object-cover" alt="LinkedIn" />
            <div>
              <span className="text-[15px] font-medium">LinkedIn</span>
              <p className="text-[13px] text-[var(--color-text-muted)]">@darshan-as</p>
            </div>
          </a>
          <a
            href="https://github.com/Darshan-A-S"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-[var(--color-hover-bg)]"
          >
            <img src={github} className="h-10 w-10 object-cover" alt="GitHub" />
            <div>
              <span className="text-[15px] font-medium">GitHub</span>
              <p className="text-[13px] text-[var(--color-text-muted)]">@Darshan-A-S</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Socials

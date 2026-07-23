import profileDots from './../assets/profile-dots.svg'

const Name = () => {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <div className="mx-auto max-w-[768px] border-x border-b border-[color:var(--color-border)]">
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch">
          <div className="border-b sm:border-b-0 sm:border-r border-[color:var(--color-border)] flex items-center justify-center p-3">
            <img
              src={profileDots}
              alt="Darshan A S"
              className="w-[200px] h-auto object-contain"
            />
          </div>
          <div className="flex flex-col justify-end w-full">
            <h1 className="text-[32px] font-bold tracking-tight border-t border-b border-[color:var(--color-border)] px-4 py-2">
              Darshan A S
            </h1>
            <p className="text-[15px] text-[var(--color-text-secondary)] border-b border-[color:var(--color-border)] px-4 py-2">
              Building with code. Also love editing videos.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="grid grid-cols-2 text-[13px]">
          <div className="border-r border-[color:var(--color-border)] px-4 py-3">
            <span className="text-[var(--color-text-muted)]">Texas AI</span>
            <p className="mt-0.5 font-medium">Associate Software Engineer</p>
          </div>
          <div className="px-4 py-3">
            <span className="text-[var(--color-text-muted)]">Location</span>
            <p className="mt-0.5 font-medium">Bangaluru, India</p>
          </div>
          <div className="border-r border-t border-[color:var(--color-border)] px-4 py-3">
            <span className="text-[var(--color-text-muted)]">Education</span>
            <p className="mt-0.5 font-medium">CSE @ JSSSTU</p>
          </div>
          <div className="border-t border-[color:var(--color-border)] px-4 py-3">
            <span className="text-[var(--color-text-muted)]">Focus</span>
            <p className="mt-0.5 font-medium">Java + AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Name

import linkedin from "./../assets/linkedin.jpg"
import github from "./../assets/github.webp"
import leetcode from "./../assets/leetcode.svg"
import codeforces from "./../assets/codeforces.svg"
import matiks from "./../assets/matiks-logo.png"
import instagram from "./../assets/instagram.svg"

const links = [
  { href: "https://www.linkedin.com/in/darshan-a-s-9a0350268/", img: linkedin, name: "LinkedIn", handle: "@darshan-as" },
  { href: "https://github.com/Darshan-A-S", img: github, name: "GitHub", handle: "@Darshan-A-S" },
  { href: "https://leetcode.com/u/Darshan_as/", img: leetcode, name: "LeetCode", handle: "@Darshan_as" },
  { href: "https://codeforces.com/profile/sus69", img: codeforces, name: "Codeforces", handle: "@sus69" },
  { href: "https://matiks.com/profile/darsh01", img: matiks, name: "Matiks", handle: "@darsh01" },
  { href: "https://www.instagram.com/_darshan_as", img: instagram, name: "Instagram", handle: "@_darshan_as" },
]

const Socials = () => {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Social Links
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="grid grid-cols-2">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-4 px-4 py-4 transition-colors hover:bg-[var(--color-hover-bg)] ${i % 2 === 0 ? 'border-r border-[color:var(--color-border)]' : ''} ${i < 4 ? 'border-b border-[color:var(--color-border)]' : ''}`}
            >
              <img src={link.img} className="h-10 w-10 object-cover" alt={link.name} />
              <div>
                <span className="text-[15px] font-medium">{link.name}</span>
                <p className="text-[13px] text-[var(--color-text-muted)]">{link.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Socials

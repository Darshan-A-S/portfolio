import logoLight from './../assets/svgs/DAS-light.svg'
import logoDark from './../assets/svgs/DAS-white.svg'

const Logo = ({ isDark }) => {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
<div
        className="relative mx-auto flex h-[200px] max-w-[768px] items-center justify-center border-x border-[color:var(--color-border)]"
      >
        <img src={isDark ? logoDark : logoLight} alt='DAS Logo' className="h-20 w-auto" />
      </div>
    </div>
  )
}

export default Logo

const About = () => {
  return (
    <div id="about" className="border-b border-[color:var(--color-border)] px-[5px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          About
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="px-4 py-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          <p>
            I'm a passionate developer who loves building things with modern web technologies.
            My journey in tech started with curiosity and evolved into a deep love for creating
            elegant, user-friendly applications.
          </p>
          <br />
          <p>
            When I'm not coding, you'll find me exploring new AI tools, contributing to open source,
            or learning about the latest in web development and machine learning.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

const experiences = [
  {
    title: 'Frontend Developer Intern',
    company: 'Tech Startup',
    period: '2024 — Present',
    location: 'Remote',
    description: [
      'Built and maintained React-based web applications',
      'Implemented responsive UI components with Tailwind CSS',
      'Collaborated with design team to improve UX',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
  },
  {
    title: 'Web Development Intern',
    company: 'Digital Agency',
    period: '2023 — 2024',
    location: 'Mysore, India',
    description: [
      'Developed client websites using modern frameworks',
      'Optimized site performance and SEO',
      'Worked with cross-functional teams',
    ],
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
]

const Experience = () => {
  return (
    <div className="border-b border-[color:var(--color-border)]">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[20px] font-bold">
          Experience
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="divide-y divide-[color:var(--color-border)]">
          {experiences.map((exp, i) => (
            <div key={i} className="px-4 py-5 transition-colors hover:bg-[var(--color-hover-bg)]">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-bold">{exp.title}</h3>
                  <p className="text-[13px] text-[var(--color-text-muted)]">{exp.company}</p>
                </div>
                <div className="text-right text-[13px] text-[var(--color-text-muted)]">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <ul className="mb-3 list-disc pl-5 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                {exp.description.map((item, j) => (
                  <li key={j} className="mb-1">{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="rounded-md border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] px-2 py-0.5 text-[11px] text-[var(--color-badge-text)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience

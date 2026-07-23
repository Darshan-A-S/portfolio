const education = [
  {
    degree: "Bachelor's degree",
    field: 'Computer Science and Engineering',
    school: 'JSS Science and Technology University',
    period: '2022 — 2026',
    location: 'Mysore, Karnataka, India',
    score: 'CGPA: 9.09',
    highlights: [
      'Data Structures & Algorithms',
      'Machine Learning',
      'Web Technologies',
      'Database Management',
      'Software Engineering',
    ],
  },
  {
    degree: 'Pre-University',
    field: 'Science (PCMCs)',
    school: 'Mandaara PU College',
    period: '2020 — 2022',
    location: 'Davanagere, Karnataka, India',
    score: 'Percentage: 97.67%',
    highlights: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Computer Science',
    ],
  },
  {
    degree: 'High School',
    field: '7th — 10th Grade',
    school: 'Vidyadayini School',
    period: '2009 — 2020',
    location: 'Harihara, Karnataka, India',
    score: 'Percentage: 79%',
    highlights: [
      'CBSE Board',
      'Science & Mathematics',
      'English',
    ],
  },
]

const Education = () => {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Education
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="divide-y divide-[color:var(--color-border)]">
          {education.map((edu, i) => (
            <div key={i} className="px-4 py-5 transition-colors hover:bg-[var(--color-hover-bg)]">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-bold">{edu.school}</h3>
                  <p className="text-[13px] text-[var(--color-text-muted)]">{edu.degree} — {edu.field}</p>
                  {edu.score && <p className="text-[13px] font-medium">{edu.score}</p>}
                </div>
                <div className="text-right text-[13px] text-[var(--color-text-muted)]">
                  <p>{edu.period}</p>
                  <p>{edu.location}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {edu.highlights.map((item, j) => (
                  <span
                    key={j}
                    className="rounded-md border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] px-2 py-0.5 text-[11px] text-[var(--color-badge-text)]"
                  >
                    {item}
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

export default Education

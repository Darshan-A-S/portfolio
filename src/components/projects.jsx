import Badge from './badge.jsx'

const projects = [
  {
    title: 'ProctorPro',
    description: 'An online assessment proctoring system built at a hackathon. Features video proctoring with multi-face detection and tools to create and share tests for secure online exams.',
    tags: ['React', 'Node.js', 'OpenCV', 'MongoDB'],
    link: 'https://proctorpro-c9ba.onrender.com/',
    period: '2024',
  },
  {
    title: 'AI Study Assistant',
    description: 'A smart study companion powered by Generative AI. Helps students with personalized learning paths, flashcards, and instant doubt resolution.',
    tags: ['Python', 'Langchain', 'React', 'Flask'],
    link: '#',
    period: '2024',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio built with React and Tailwind CSS. Features dark mode, responsive design, and LeetCode contribution tracking.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    link: '#',
    period: '2025',
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'A responsive admin dashboard for managing products, orders, and analytics with real-time data visualization.',
    tags: ['React', 'Chart.js', 'Tailwind CSS', 'Firebase'],
    link: '#',
    period: '2024',
  },
]

const Projects = () => {
  return (
    <div id="projects" className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Projects
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="divide-y divide-[color:var(--color-border)]">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-5 transition-colors hover:bg-[var(--color-hover-bg)]"
            >
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-[15px] font-bold underline decoration-1 underline-offset-2">{project.title}</h3>
                <span className="shrink-0 text-[13px] text-[var(--color-text-muted)]">{project.period}</span>
              </div>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <Badge key={j} text={tag} />
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects

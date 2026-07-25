import { useState } from 'react'
import Badge from './badge.jsx'

const projects = [
  {
    title: 'ProctorPro',
    description: 'An online assessment proctoring system built at a hackathon. Features video proctoring with multi-face detection and tools to create and share tests for secure online exams.',
    highlights: [
      'Built a full-stack exam proctoring platform enabling secure, webcam-monitored online examinations',
      'Developed a real-time face detection microservice using Python, Flask, and OpenCV to flag multiple-face violations and auto-capture screenshot evidence',
      'Implemented the complete exam lifecycle — test creation, question bank management, candidate authentication, live exam delivery, and automated scorecard generation',
      'Secured user access with Passport.js, handling authentication, session management, and role-based access control',
    ],
    tags: ['React', 'Node.js', 'OpenCV', 'MongoDB'],
    link: 'https://proctorpro-c9ba.onrender.com/',
    period: 'November \'24',
  },
  {
    title: 'ScrapeSuite',
    description: 'A no-code web scraping platform enabling users to visually select and extract data from websites without writing any code, with support for dynamic content, scheduling, and monitoring.',
    highlights: [
      'Built a point-and-click element selector letting users pick page data via XPath/CSS selectors without coding',
      'Used Puppeteer to render JavaScript-heavy dynamic websites via a headless browser for accurate data capture',
      'Implemented task scheduling and website change monitoring to enable automated, recurring scraping',
      'Supported multi-format data export (CSV, JSON, Excel) with a preview step before download',
    ],
    tags: ['Node.js', 'Puppeteer', 'JavaScript'],
    link: '',
    period: 'July \'25',
  },
  {
    title: 'Multimodal PTSD Risk Prediction System',
    description: 'A multimodal deep learning system built with a team of 4 to predict PTSD risk from clinical interview videos by fusing text, audio, and facial behavior data, with built-in uncertainty estimation and explainability for clinical decision support.',
    highlights: [
      'Collaborated in a 4-member team to build an end-to-end pipeline that extracts text (via Whisper), audio, and video from a single interview recording and fuses them for PTSD prediction',
      'Designed a shared residual encoder projecting Mental RoBERTa and EfficientNet-B4 embeddings into a unified latent space, and benchmarked 4 fusion strategies — achieving 84.6% accuracy with Early Fusion',
      'Implement Monte Carlo Dropout-based uncertainty estimation (30 stochastic passes), giving clinicians confidence scores alongside each prediction',
    ],
    tags: ['Python', 'PyTorch', 'HuggingFace Transformers', 'FastAPI', 'Computer Vision', 'NLP'],
    link: '',
    period: 'April \'26',
  },
]

const moreProjects = [
  {
    title: 'AI Study Assistant',
    description: 'A smart study companion powered by Generative AI. Helps students with personalized learning paths, flashcards, and instant doubt resolution.',
    highlights: [],
    tags: ['Python', 'Langchain', 'React', 'Flask'],
    link: '#',
    period: '2024',
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'A responsive admin dashboard for managing products, orders, and analytics with real-time data visualization.',
    highlights: [],
    tags: ['React', 'Chart.js', 'Tailwind CSS', 'Firebase'],
    link: '#',
    period: '2024',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio built with React and Tailwind CSS. Features dark mode, responsive design, and LeetCode contribution tracking.',
    highlights: [],
    tags: ['React', 'Tailwind CSS', 'Vite'],
    link: '#',
    period: '2025',
  },
]

const ProjectCard = ({ project }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noreferrer"
    className="block px-4 py-5 transition-colors hover:bg-[var(--color-hover-bg)]"
  >
    <div className="mb-2 flex items-start justify-between">
      <h3 className="text-[18px] font-bold decoration-1 underline underline-offset-4">{project.title}</h3>
      <span className="shrink-0 text-[13px] text-[var(--color-text-muted)]">{project.period}</span>
    </div>
    <p className="mb-3 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
      {project.description}
    </p>
    {project.highlights && project.highlights.length > 0 && (
      <ul className="mb-3 list-disc pl-5 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
        {project.highlights.map((item, j) => (
          <li key={j} className="mb-1">{item}</li>
        ))}
      </ul>
    )}
    <div className="flex flex-wrap gap-2">
      {project.tags.map((tag, j) => (
        <Badge key={j} text={tag} />
      ))}
    </div>
  </a>
)

const Projects = () => {
  const [showMore, setShowMore] = useState(false)

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
            <ProjectCard key={i} project={project} />
          ))}
          {showMore && moreProjects.map((project, i) => (
            <ProjectCard key={`more-${i}`} project={project} />
          ))}
        </div>
      </div>
      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] flex justify-center py-2">
          <button onClick={() => setShowMore(!showMore)} className="inline-flex items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border border-transparent bg-[var(--color-badge-bg)] px-3 py-2 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)] active:scale-[0.98] cursor-pointer">
            {showMore ? 'Show Less' : 'Load More'}
            {showMore ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down group-data-open/collapsible:rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down group-data-open/collapsible:rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects

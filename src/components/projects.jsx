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
    isExpanded: true,
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
    isExpanded: false,
  },
  {
    title: 'PTSD Risk Prediction System',
    description: 'A multimodal deep learning system built with a team of 4 to predict PTSD risk from clinical interview videos by fusing text, audio, and facial behavior data, with built-in uncertainty estimation and explainability for clinical decision support.',
    highlights: [
      'Collaborated in a 4-member team to build an end-to-end pipeline that extracts text (via Whisper), audio, and video from a single interview recording and fuses them for PTSD prediction',
      'Designed a shared residual encoder projecting Mental RoBERTa and EfficientNet-B4 embeddings into a unified latent space, and benchmarked 4 fusion strategies — achieving 84.6% accuracy with Early Fusion',
      'Implement Monte Carlo Dropout-based uncertainty estimation (30 stochastic passes), giving clinicians confidence scores alongside each prediction',
    ],
    tags: ['Python', 'PyTorch', 'HuggingFace Transformers', 'FastAPI', 'Computer Vision', 'NLP'],
    link: '',
    period: 'April \'26',
    isExpanded: false,
  },
  {
    title: 'Dasfolio',
    description: 'My personal dev portfolio and my interests',
    tags: ['React 19', 'Vite 7', 'Tailwind CSS v4', 'p5.js', 'Cloudinary', 'Lucide React', 'Vercel Serverless'],
    link: '#',
    period: 'July \'26',
    isExpanded: false,
  },
  {
    title: 'Brainly',
    description: 'CNN-based binary classifier for brain MRI scans with a web interface for real-time inference.',
    highlights: ['Trained a CNN achieving high accuracy on Tumor vs No Tumor classification from brain MRI scans', 'Built a full pipeline — image upload, automated preprocessing, and real-time prediction', 'Integrated the model with a user-friendly web application for accessible AI-assisted diagnosis'],
    tags: ['Python', 'TensorFlow', 'CNN', 'Flask', 'OpenCV'],
    link: '',
    period: 'July \'25',
    isExpanded: false,
  },
]

const moreProjects = [
  // {
  //   title: 'Coming Soon',
  //   description: 'Details coming soon.',
  //   highlights: [],
  //   tags: [],
  //   link: '',
  //   period: '',
  //   isExpanded: false,
  // },
]

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(project.isExpanded)

  return (
    <div className="px-4 py-5 transition-colors hover:bg-[var(--color-hover-bg)]">
      <button onClick={() => setExpanded(!expanded)} className="flex w-full cursor-pointer items-baseline justify-between gap-2 text-left">
        <h3 className="text-[18px] font-bold decoration-1 underline underline-offset-4">{project.title}</h3>
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] text-[var(--color-text-muted)]">
          {project.period}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="mb-3 mt-2 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {project.description}
          </p>
          {project.highlights?.length > 0 && (
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
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [showMore, setShowMore] = useState(false)

  return (
    <div id="projects" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
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
        </div>
        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${showMore ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="divide-y divide-[color:var(--color-border)] border-t border-[color:var(--color-border)]">
              {moreProjects.map((project, i) => (
                <ProjectCard key={`more-${i}`} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] flex justify-center py-2">
          <button onClick={() => setShowMore(!showMore)} className="inline-flex items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border border-transparent bg-[var(--color-badge-bg)] px-3 py-1 text-[13px] font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-badge-border)] active:scale-[0.98] cursor-pointer">
            {showMore ? 'Show Less' : 'Load More'}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects

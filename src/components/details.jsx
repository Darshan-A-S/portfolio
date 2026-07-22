import { AcademicHat, BookOpen, Location, Telephone, Envelope, ExternalLink } from "@mynaui/icons-react";
import UnderlinedText from './underlinetext';

const Details = () => {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[5px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Overview
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="border-b border-[color:var(--color-border)] px-4 py-4 text-[15px] leading-relaxed">
          Hi, I am <strong>Darshan A S</strong> — a final year Computer Science Engineering Student passionate about building web applications integrated with AI.
          <br /><br />
          I build high-quality web applications with React and modern front-end technologies. I'm also passionate about Machine Learning and Generative AI, exploring ways to integrate them into impactful projects.
          <br /><br />
          One of my best projects is <a href="https://proctorpro-c9ba.onrender.com/" target='_blank' rel="noreferrer" className="underline decoration-1 underline-offset-2 hover:text-[var(--color-text)]"><UnderlinedText text="ProctorPro" /></a> — An online assessment proctoring system built at a hackathon. It features <UnderlinedText text="video proctoring with multi-face detection" /> and tools to create and share tests for secure online exams.
          <br /><br />
          I'm also into <UnderlinedText text="vibe coding" /> building useful projects at a fast pace and experimenting with new ideas.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {[
            { icon: <AcademicHat width={16} />, label: 'Completed my engineering at', value: 'JSSSTU', link: true },
            { icon: <BookOpen width={16} />, label: 'Field', value: 'Computer Science and Engineering' },
            { icon: <Location width={16} />, label: 'Location', value: 'Mysore, Karnataka, India' },
            { icon: <Telephone width={16} />, label: 'Phone', value: '+91 74830 91124' },
            { icon: <Envelope width={16} />, label: 'Email', value: 'asdarshan894@gmail.com' },
            { icon: <ExternalLink width={16} />, label: 'Website', value: 'das.com', link: true },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] transition-colors hover:bg-[var(--color-hover-bg)] ${
                i % 2 === 0 ? 'border-r border-[color:var(--color-border)]' : ''
              } ${i < 4 ? 'border-b border-[color:var(--color-border)]' : ''}`}
            >
              <span className="shrink-0 text-[var(--color-text-muted)]">{item.icon}</span>
              <span className="text-[var(--color-text-muted)]">{item.label}</span>
              <span className={`ml-auto font-medium ${item.link ? 'underline decoration-1 underline-offset-2' : ''}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Details

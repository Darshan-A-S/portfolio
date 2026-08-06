import { AcademicHat, BookOpen, Location, Telephone, Envelope, ExternalLink } from "@mynaui/icons-react";
import UnderlinedText from './underlinetext';

const Details = () => {
  return (
    <div id="about" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Overview
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="border-b border-[color:var(--color-border)] px-4 py-4 text-[15px] leading-relaxed">
          Hi, I am <span className="font-playfair italic">Darshan A S</span>, an Associate Software Engineer at Texas AI. I work on backend systems using Java and Spring Boot, with a solid background in React and front-end development.
          <br /><br />
          I enjoy building real, functional projects — REST APIs, WebSocket-based apps, and export pipelines — and I'm always interested in exploring how AI can be integrated into practical products.
          <br /><br />
          My favorite project so far is <a href="https://proctorpro-c9ba.onrender.com/" target='_blank' rel="noreferrer" className="decoration-1 underline-offset-2 hover:text-[var(--color-text)]"><UnderlinedText text="ProctorPro" /></a> — an online exam proctoring system with real-time multi-face detection, built during a hackathon.
          <br /><br />
          Outside of work, I enjoy <UnderlinedText text="video editing" /> and exploring new ideas.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {[
            { icon: <Location width={16} />, label: 'Address', value: 'Davanagere, Karnataka, India' },
            { icon: <Telephone width={16} />, label: 'Phone', value: '+91 74830 91124' },
            { icon: <Envelope width={16} />, label: 'Email', value: 'darshanas.work@gmail.com' },
            { icon: <ExternalLink width={16} />, label: 'Website', value: 'das-folio.in/', link: true, },
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

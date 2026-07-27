import Python from './../assets/python.svg'
import Cprog from './../assets/c-1.svg'
import html from './../assets/html-1.svg'
import css from './../assets/css-3.svg'
import js from './../assets/javascript-1.svg'
import react from './../assets/react.svg'
import tailwind from './../assets/tailwind-css-2.svg'
import langchain from './../assets/langchain.svg'
import github from './../assets/github-mark.svg'
import Figma from './../assets/figma.svg'
import django from './../assets/django.svg'
import chatgpt from './../assets/chatgpt.svg'
import opencv from './../assets/opencv.svg'
import vscode from './../assets/vs-code.svg'
import capcut from './../assets/capcut.jpeg'
import sql from './../assets/mysql-logo-pure.svg'
import java from './../assets/java.png'
import claude from './../assets/claude.svg'
import postman from './../assets/Postman.svg'
import vercel from './../assets/vercel.svg'
import springboot from './../assets/spring-boot.svg'
import mongodb from './../assets/MongoDB.svg'

const categories = [
  {
    num: '01',
    title: 'Languages',
    items: [
      { src: java, name: 'Java' },
      { src: Python, name: 'Python' },
      { src: Cprog, name: 'C' },
      { src: js, name: 'JavaScript' },
    ],
  },
  {
    num: '02',
    title: 'Frontend',
    items: [
      { src: html, name: 'HTML' },
      { src: css, name: 'CSS' },
      { src: react, name: 'React' },
      { src: tailwind, name: 'Tailwind' },
    ],
  },
  {
    num: '03',
    title: 'Backend & Database',
    items: [
      { src: django, name: 'Django' },
      { src: springboot, name: 'Spring Boot' },
      { src: sql, name: 'MySQL' },
      { src: mongodb, name: 'MongoDB' },
    ],
  },
  {
    num: '04',
    title: 'Workflow & AI',
    items: [
      { src: langchain, name: 'Langchain' },
      { src: opencv, name: 'OpenCV' },
      { src: chatgpt, name: 'ChatGPT' },
      { src: claude, name: 'Claude' },
      { src: github, name: 'GitHub' },
      { src: postman, name: 'Postman' },
      { src: vercel, name: 'Vercel' },
    ],
  },
  {
    num: '05',
    title: 'Tools & Design',
    items: [
      { src: Figma, name: 'Figma' },
      { src: vscode, name: 'VS Code' },
      { src: capcut, name: 'Capcut' },
    ],
  },
]

const Techstack = () => {
  return (
    <div id="stack" className="scroll-m-[20vh] border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Stack
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <div className="divide-y divide-[color:var(--color-border)]">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-start gap-4 px-4 py-4 transition-colors hover:bg-[var(--color-hover-bg)]">
              <span className="shrink-0 text-[13px] font-bold text-[var(--color-text-muted)]">{cat.num}</span>
              <div className="flex-1">
                <h3 className="mb-3 text-[13px] font-bold">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((tech, j) => (
                    <div key={j} className="group relative inline-flex items-center gap-2 rounded-md border border-[var(--color-badge-border)] bg-[var(--color-badge-bg)] px-3 py-1.5 text-[13px] transition-all hover:border-[var(--color-text-muted)]">
                      <img src={tech.src} alt={tech.name} className="h-4 w-4 object-contain" />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Techstack

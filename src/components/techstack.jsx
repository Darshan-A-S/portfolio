import React from 'react'
import './techstack.css'
import linkedin from './../assets/linkedin.jpg'
import Python from './../assets/python.svg'
import Cprog from './../assets/c-1.svg'
import html from './../assets/html-1.svg'
import css from './../assets/css-3.svg'
import js from './../assets/javascript-1.svg'
import react from './../assets/react.svg'
import tailwind from './../assets/tailwind-css-2.svg'
import numpy from './../assets/numpy-svgrepo-com.svg'
import pandas from './../assets/Pandas.svg'
import langchain from './../assets/langchain.svg'
import github from './../assets/github-mark.svg'
import Figma from './../assets/figma.svg'
import django from './../assets/django.svg'
import chatgpt from './../assets/chatgpt.svg'
import opencv from './../assets/opencv.svg'
import vscode from './../assets/vs-code.svg'
import capcut from './../assets/capcut.jpeg'
import sql from './../assets/mysql-logo-pure.svg'


const Techstack = () => {
  const techs = [
    { src: Python, name: 'Python' },
    { src: Cprog, name: 'C' },
    { src: html, name: 'HTML' },
    { src: css, name: 'CSS' },
    { src: js, name: 'Javascript' },
    { src: react, name: 'React' },
    { src: tailwind, name: 'Tailwind' },
    { src: sql, name: 'MySQL' },
    { src: django, name: 'Django' },
    { src: numpy, name: 'NumPy' },
    { src: pandas, name: 'Pandas' },
    { src: langchain, name: 'Langchain' },
    { src: opencv, name: 'OpneCV' },
    { src: github, name: 'GitHub' },
    { src: Figma, name: 'Figma' },
    { src: capcut, name: 'Capcut' },
    { src: chatgpt, name: 'ChatGPT' },
    { src: vscode, name: 'VS-code' },
  ]

  return (
    <div className='tech-container'>
      <h3>Tech Stack</h3>
      <div className="tech-icons">
        {techs.map((tech, index) => (
          <div className="tooltip" key={index}>
            <img src={tech.src} alt={tech.name} />
            <span className="tooltip-text">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Techstack

import React from 'react'
import './about.css'
import UnderlinedText from './underlinetext'

const About = () => {
  return (
    <div className='about-container' id='about'>
        <h3>About</h3>
        <div className="content">
          Hi, I am Darshan A S — a final year Computer Science Engineering Student passionate about building web applications integrated with AI. <br /><br />
          I build high-quality web applications with React and modern front-end technologies. I’m also passionate about Machine Learning and Generative AI, exploring ways to integrate them into impactful projects. <br /><br />
          One of my best project is <a href="https://proctorpro-c9ba.onrender.com/" target='_blank'><UnderlinedText text = "ProctotPro"/></a> – An online assessment proctoring system built at a hackathon. It features <UnderlinedText text = "video proctoring with multi-face detection"/> and tools to create and share tests for secure online exams. <br /><br />
          I’m also into <UnderlinedText text="vibe coding"/> building useful projects at a fast pace and experimenting with new ideas. 
        </div>

      
    </div>
  )
}

export default About

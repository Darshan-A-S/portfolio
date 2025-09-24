import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/nav.jsx'
import Logo from './components/logo.jsx'
import Name from './components/name.jsx'
import Details from './components/details.jsx'
import Seperation from './components/sperations-bar.jsx'
import Socials from './components/socials.jsx'
import About from './components/about.jsx'
import Tech from './components/techstack.jsx'
import Projects from './components/projects.jsx'
import Inspirations from './components/inspirations.jsx'
import LogoFoot from './components/logo-foot.jsx'

function App() {
  return (
    <div>
      <Navbar />
      <Logo />
      <Name />
      <Seperation />
      <Details /> 
      <Seperation />
      <Socials/>
      <Seperation />
      <About/>
      <Seperation />
      <Tech />
      <Seperation />
      <Projects/>
      <Seperation />
      <LogoFoot />
      {/* <Seperation/> */}
      <Inspirations/>

    </div>
  )
}

export default App

import React from 'react'
import logo from './../assets/DAS.svg'
import './logo.css'
// import { DotPattern } from "@/components/magicui/dot-pattern";


const Logo = () => {
  return (
    <div className='logo-container'>
      {/* <DotPattern/> */}
      <div className='logo-main'>
      <div className="dot-pattern"></div>
        <div className='logo'>
          <img src={logo} alt='DAS Logo' className='logo' />
        </div>
      </div>
    </div>
  )
}

export default Logo

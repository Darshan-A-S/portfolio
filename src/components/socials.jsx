import React from 'react'
import './socials.css'
import linkedin from "./../assets/linkedin.jpg"
import github from "./../assets/github.webp"


const Socials = () => {
    return (
        <div>
            <div className="grid-container">
                <a href="https://www.linkedin.com/in/darshan-a-s-9a0350268/" target='_blank'>

                    <div className="grid-item">
                        <img src={linkedin} className="icon" />
                        <div className="text-content">
                            <span className="title">LinkedIn</span>
                            <span className="username">darshan_as</span>
                        </div>
                    </div>
                </a>
                <a href="https://github.com/Darshan-A-S" target='_blank'>

                    <div className="grid-item">
                        <img src={github} className="icon" />
                        <div className="text-content">
                            <span className="title">Github</span>
                            <span className="username">Darshan-A-S</span>
                        </div>
                    </div>
                </a>
            </div>


        </div>
    )
}

export default Socials




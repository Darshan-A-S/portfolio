import React from 'react'
import './name.css'
import image from './../assets/image.jpg'


const Name = () => {
    return (
        <div className='name-container'>
            <div className="main">

                <div className='left'>
                    <img src={image} alt="Your Name" className='image' />
                </div>
                <div className='right'>
                    {/* <div className="pattern"></div> */}
                    <h3 className='name'>Darshan A S</h3>
                    <div className="sub-heading">
                        <div class="wrapper">
                            <div class="vertical-words">
                                <span>UI Designer</span>
                                <span>Frontend Developer</span>
                                <span>ML Enthusiast</span>
                                <span>Vibe Coder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Name

import React from 'react'
import "./inspirations.css"
import UnderlinedText from './underlinetext'


const Inspirations = () => {
    return (

        <div className='inspi-container'>
            <div className='inspi'>
                <p>Inspired by <a href="https://chanhdai.com"><UnderlinedText text="https://chanhdai.com" /></a> and created by <UnderlinedText text="Darshan" /> with love ❤️</p>
            </div>
        </div>
    )
}

export default Inspirations

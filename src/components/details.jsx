import React from 'react'
import "./details.css"
import { AcademicHat, BookOpen, Location, Telephone, Envelope, ExternalLink } from "@mynaui/icons-react";
import { Link } from 'react-router-dom';
import UnderlinedText from './underlinetext';


const Details = () => {
  return (
    <div className='details-container'>
        <ul className='details-list'>
            <li><AcademicHat width={20}/>Final Year Student at<UnderlinedText text = "JSSSTU"/></li>
            <li><BookOpen width={20}/>Computer Science and Engineering</li>   
            <li><Location width={20}/>Mysore, Karnataka, India</li>
            <li><Telephone width={20}/>+91 74830 91124</li>
            <li><Envelope width={20}/>asdarshan894@gmail.com</li>
            <li><ExternalLink  width={20}/>das.com</li>
        </ul>
      
    </div>
  )
}

export default Details

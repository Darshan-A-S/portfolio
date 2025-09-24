import React from 'react'
import Project from './project.jsx'
import './projects.css'
import Badge from './badge.jsx'


const Projects = () => {
    return (
        <div className='projects-container' id = 'projects' >
            <h3>Projects</h3>

            <Project title="ProctorPro" >
                <div className='pro-details'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam similique reprehenderit voluptatem sed hic <br /><br />
                    <ul>
                        <li>Cool UI </li>
                        <li>Responsive design</li>
                        <li>COLlllll</li>
                        <li>sadkhweiorjoe</li>
                    </ul>
                </div>
                <p className='badges'>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                </p>
            </Project>
            <Project title="ProctorPro" logo = "./../assets/logo/jpg">
                <div className='pro-details'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam similique reprehenderit voluptatem sed hic <br /><br />
                    <ul>
                        <li>Cool UI </li>
                        <li>Responsive design</li>
                        <li>COLlllll</li>
                        <li>sadkhweiorjoe</li>
                    </ul>
                </div>
                <p className='badges'>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                </p>
            </Project>
            <Project title="ProctorPro" logo = "./../assets/logo/jpg">
                <div className='pro-details'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam similique reprehenderit voluptatem sed hic <br /><br />
                    <ul>
                        <li>Cool UI </li>
                        <li>Responsive design</li>
                        <li>COLlllll</li>
                        <li>sadkhweiorjoe</li>
                    </ul>
                </div>
                <p className='badges'>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                </p>
            </Project>
            <Project title="ProctorPro" logo = "./../assets/logo/jpg">
                <div className='pro-details'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam similique reprehenderit voluptatem sed hic <br /><br />
                    <ul>
                        <li>Cool UI </li>
                        <li>Responsive design</li>
                        <li>COLlllll</li>
                        <li>sadkhweiorjoe</li>
                    </ul>
                </div>
                <p className='badges'>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                    <Badge text="Hello"/>
                </p>
            </Project>

        </div>
    )
}


export default Projects

import React from 'react'
import Aboutcontent from '../components/Aboutcontent'

function About() {
    return (
        <div className="relative  min-h-[calc(100vh-7.6rem)] flex px-[5%] py-[20px] sm:py-[40px] text-justify z-[1] box-border gap-5  w-full">
            <Aboutcontent />
            <div className="min-w-full md:min-w-[80%] h-fit z-[2] px-7 space-y-5 ">
                <div id="About" className="w-full">
                    <p className="heading">About The Chapter</p>
                    <p className="subheading">Introducing IEM's IEEE IES Students Chapter</p>
                    <div className="paratext mt-3 space-y-2">
                        <p>The IEEE Industrial Electronics Society (IES) Student Chapter at the <a href="https://iem.edu.in/" className="linkanimate text-zinc-700">Institute of Engineering & Management (IEM)</a>, Kolkata was officially established on 5th May 2025 under the aegis of the Department of Electrical Engineering. The chapter is recognized by the <a href="https://www.ieee.org/" className="linkanimate text-zinc-700">IEEE</a> with the official Student Branch Chapter (SBC) Code: SBC14301J.
                        </p>
                        <p>Serving as a vibrant hub for students interested in industrial electronics, automation, control systems, and intelligent technologies, the chapter is guided by its esteemed advisor, Dr. Sourav Das.
                        </p>
                        <p>As part of the globally connected <a href="https://www.ieee-ies.org/" className="linkanimate text-zinc-700">IEEE IES</a> community, this student chapter is committed to:</p>
                        <ul className="list-disc pl-7">
                            <li>Hosting technical workshops, seminars, and webinars</li>

                        <li>Facilitating industrial visits and field-based learning</li>

                        <li>Encouraging innovation, research, and technical publications</li>

                        <li>Organizing conferences, competitions, and collaborative projects</li>
                        </ul>
                        
                        <p>Driven by a mission to bridge classroom learning with real-world applications, the chapter empowers students to explore cutting-edge industrial technologies and prepares them for impactful careers in the field.</p>
                    </div>
                </div>
                <div id="Mission" className="w-full ">misssion</div>
                <div id="Vision" className="w-full ">vision</div>
                <div id="Membership" className="w-full">membership</div>
                <div id="Benifits" className="w-full ">benifits</div>
            </div>
        </div>
    )
}

export default About
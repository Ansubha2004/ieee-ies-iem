import React,{useEffect} from 'react'
import Aboutcontent from '../components/Aboutcontent'
import {useLocation} from "react-router-dom"

function About() {

    const location=useLocation();

    useEffect(()=>{
        if(location.hash)
        {
            const ele=document.querySelector(location.hash); 
            if(ele)
                ele.scrollIntoView({behavior:'smooth'})
        }
    },[])


    return (
        <div className="relative  min-h-[calc(100vh-7.6rem)] flex px-[5%] py-[20px] sm:py-[40px] text-justify z-[1] box-border lg:gap-4 md:gap-2  w-full">
            <Aboutcontent />
            <div className="min-w-full md:min-w-[80%] h-fit z-[2] md:px-4 lg:px-7 md:text-left text-center space-y-10 ">
                <div id="About" className="w-full scroll-mt-[185px]">
                    <p className="heading">About The Chapter</p>
                    <p className="subheading">Introducing IEM's IEEE IES Students Chapter</p>
                    <div className="paratext mt-3 space-y-2 ">
                        <p>The IEEE Industrial Electronics Society (IES) Student Chapter at the <a href="https://iem.edu.in/" className="linkanimate text-zinc-700">Institute of Engineering & Management (IEM)</a>, Kolkata was officially established on 5th May 2025 under the aegis of the Department of Electrical Engineering. The chapter is recognized by the <a href="https://www.ieee.org/" className="linkanimate text-zinc-700">IEEE</a> with the official Student Branch Chapter (SBC) Code: SBC14301J.
                        </p>
                        <p>Serving as a vibrant hub for students interested in industrial electronics, automation, control systems, and intelligent technologies, the chapter is guided by its esteemed advisor, Dr. Sourav Das.
                        </p>
                        <p>As part of the globally connected <a href="https://www.ieee-ies.org/" className="linkanimate text-zinc-700">IEEE IES</a> community, this student chapter is committed to:</p>
                        <ul className="list-disc pl-7 space-y-1.5 marker:text-amber-600">
                            <li>Hosting technical workshops, seminars, and webinars</li>
                            <li>Facilitating industrial visits and field-based learning</li>
                            <li>Encouraging innovation, research, and technical publications</li>
                            <li>Organizing conferences, competitions, and collaborative projects</li>
                        </ul>

                        <p>Driven by a mission to bridge classroom learning with real-world applications, the chapter empowers students to explore cutting-edge industrial technologies and prepares them for impactful careers in the field.</p>
                    </div>
                </div>
                <div id="Mission" className="w-full md:scroll-mt-[150px] lg:scroll-mt-[185px]">
                    <p className="heading">Chapter's Mission</p>
                    <div className="paratext mt-3 space-y-2 ">
                        <p>The mission of the IEEE Industrial Electronics Society Student Chapter is to serve as a distinguished platform for fostering intellectual curiosity, technical excellence, and leadership among students in the realm of industrial electronics. The chapter is dedicated to advancing knowledge through the integration of academic learning with real-world engineering practices, encouraging innovation, interdisciplinary collaboration, and research-driven exploration.</p>
                        <p>By organizing technical workshops, seminars, industrial visits, and knowledge-sharing sessions, the chapter seeks to bridge the gap between education and industry, equipping students with the practical skills and ethical grounding required in modern engineering environments. We strive to nurture a generation of professionals who are not only technically proficient but also socially responsible, globally aware, and committed to contributing meaningfully to technological progress and sustainable development.</p>
                    </div>
                </div>
                <div id="Vision" className="w-full md:scroll-mt-[150px] lg:scroll-mt-[185px]">
                    <p className="heading">Chapter's Vision</p>
                    <div className="paratext mt-3 space-y-2">
                        <p>To advance technological excellence and global progress by fostering innovation, nurturing student leadership, and promoting the integration and application of knowledge in industrial and information technologies. The chapter envisions becoming a catalyst for professional growth and academic collaboration, empowering students to contribute meaningfully to society, industry, and the engineering profession.</p>
                    </div>
                </div>
                <div id="Membership" className="w-full md:scroll-mt-[150px] lg:scroll-mt-[185px]">
                    <p className="heading">Membership Details</p>
                    <p className="subheading">Guidance to apply for membership</p>
                    <div className="paratext mt-3 space-y-2 text-left">
                        <ul className="list-disc pl-4 sm:pl-7 space-y-1.5 marker:text-amber-600">
                            <li>Visit the <a href="https://www.ieee.org/membership/join" className="linkanimate text-zinc-700">registration page</a> of IEEE and apply for membership.</li>
                            <li>Visit the <a href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMIE013" className="linkanimate text-zinc-700">registration page</a> of IEEE Industrial Electronics Society and apply for membership.</li>
                            <li>On successful registration of membership, kindly download the membership card and the receipt.</li>
                            <li>Fill the given form : <a href="https://forms.gle/Z9jAjDcjha463atS8" className="linkanimate text-zinc-700">https://forms.gle/Z9jAjDcjha463atS8</a> </li>
                        </ul>
                        <p>Congratulation! Now you are an official member of IEEE IES IEM.</p>
                    </div>
                </div>
                <div id="Benifits" className="w-full md:scroll-mt-[150px] lg:scroll-mt-[185px]">
                    <p className="heading">Membership Benifits</p>
                    <p className="subheading">Perks of joining the chapter</p>
                    <div className="paratext mt-3 space-y-2 mb-10 text-left">
                        <ul className="list-disc pl-4 sm:pl-7 space-y-1.5 marker:text-amber-600">
                            <li>Full access to IEEE IES Magazine</li>
                            <li>Exposure to various IEEE Communities</li>
                            <li>Students can direcrtly collaborate with Indutrial Experts</li>
                            <li>Full access to varoius research papers worldwide on various domain</li>
                            <li>GRANTS: Academic grants for best research paper publication</li>
                            <li>Exposure to various technical workshops, events & industries</li>
                            <li>Access to Digital library (over 56 lakh + artcicles) and E-learning library</li>
                            <li>Access to Technical Publications and Networking Opportunities</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
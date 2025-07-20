import React from 'react'
import Homebanner from "../components/homebanner.jsx"
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom"
import iesvideo from "../assets/IESvideo.mp4"
import { SiTicktick } from "react-icons/si";
import Banner1 from "../components/Banner1.jsx"
import Formbanner from "../components/Formbanner.jsx"
import Homeevents from '../components/Homeevents.jsx';
import Homegallery from "../components/Homegallery.jsx"

function Home() {

  const navigate = useNavigate();

  const Points = [
    {
      head: "Global Exposure",
      body: "Connect with IEEE professionals, researchers, and students worldwide",
    },
    {
      head: "Skill Development",
      body: "Access workshops, coding contests, hackathons, and technical talks",
    },
    {
      head: "Academic & Research Support",
      body: " Publish papers, attend conferences, and engage in funded projects",
    },
    {
      head: "Leadership Opportunities",
      body: "Take up roles in event management, technical teams, and outreach",
    },
  ];

  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center z-[1] box-border  ">
      <Homebanner />
      <div
        id="view"
        className="w-full h-auto scroll-mt-[100px] lg:scroll-mt-[140px]"
      >
        <div className="w-full h-auto px-[5%] py-[20px] md:py-[30px] flex md:flex-row-reverse flex-col-reverse md:gap-0 gap-7 items-center ">
          <div className="w-full md:w-1/2 aspect-video">
            <video
              className="w-full h-full object-contain"
              controls
            >
              <source src={iesvideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full flex flex-col items-center md:block md:w-1/2 h-auto md:pr-[3%]">
            <p className="heading">Chapter at a Glance</p>
            <p className="subheading ">
              IEEE IES Students Chapter - IEM, Kolkata
            </p>
            <br />
            <p className="paratext text-[0.85rem]">
              This is the official page of the IEEE Industrial Electronics Society (IES) Student Branch Chapter at IEM.
              Rooted in the academic excellence of the Electrical Engineering Department at the Institute of Engineering & Management, Kolkata, this chapter embodies the spirit of innovation, technical growth, and industry-ready learning.
              <br />
              Here, innovation meets application. As a part of one of IEEE's most dynamic technical societies, we explore the rapidly advancing field of industrial electronics — from smart systems and automation to power electronics and intelligent control technologies.
            </p>
            <br />
            <Button
              Content="Start Your IES Journey"
              themecss="btn1 px-[7%]"
              click={() => { navigate("/About#About") }}
            />
          </div>
        </div>
      </div>
      <Banner1 />
      <div className="w-full text-center px-[5%] mb-[7%] sm:mb-[3%]">
        <p className="heading">Why to Engage?</p>
        <p className="subheading text-[0.8rem] sm:text-[1rem] sm:text-normal">
          Grow beyond classrooms. IEEE-IES-IEM awaits!
        </p>
        <br />
        <div className="w-full h-auto flex flex-col sm:grid grid-cols-2 gap-4 sm:gap-6">
          {Points.map((point, index) => (
            <div
              key={index}
              className="w-full rounded-[10px] bg-gradient-to-br from-white to-yellow-100 h-auto max-h-[100px] flex justify-between p-[3%] items-center hover:scale-[1.01] transition-all"
            >
              <SiTicktick size={60} className="text-amber-700" />
              <div className="w-full pl-3 flex flex-col items-start">
                <p className="text-[1.2rem] font-[700]">{point.head}</p>
                <p className="paratext  text-left text-[0.9rem] sm:text-[0.8rem] text-blue-900">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Formbanner />
      <br className="sm:hidden" />
      <div className="w-full box-border px-[5%] pb-[3%]">
        <p className="heading  text-center  leading-9">
          Events & Announcements
        </p>
        <p className="subheading mt-1 text-[0.8rem] sm:text-[1rem] text-center ">
          What’s New, What’s Next – Events at a Glance
        </p>
        <br />
        <Homeevents />
        <br />
      </div>
      <div className="box-border flex flex-col items-center px-[5%] pb-[3%]">
        <p className="heading text-center  leading-9">
          Gallery of Experiences
        </p>
        <p className="subheading mt-1 text-[0.8rem] sm:text-[1rem] text-center ">
          Frames of Fellowship, Fun, and Future
        </p>
        <Homegallery />
      </div>
    </div>
  )
}

export default Home
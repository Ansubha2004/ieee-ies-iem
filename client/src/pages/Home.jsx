import React from 'react'
import Homebanner from "../components/homebanner.jsx"
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom"
import iesvideo from "../assets/IESvideo.mp4"

function Home() {

  const navigate = useNavigate();

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
      <div></div>
    </div>
  )
}

export default Home
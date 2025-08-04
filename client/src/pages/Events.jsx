import React from 'react'
import orangebg3 from "../assets/designs/orangebg3.png"
import EventBanner from '../components/EventBanner.jsx';

function Events() {
  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center  z-[1] box-border  ">
      <div className="relative w-full flex justify-center   h-auto">
        <img src={orangebg3} className="absolute w-full h-[400px] z-[0]" alt="" />
        <EventBanner/>
      </div>
      <div id="view" className="scroll-mt-[108px] lg:scroll-mt-[140px] px-[5%] py-[20px] sm:py-[40px]">
        <p className="heading text-center">Events & Activity Highlights</p>
        <p className="subheading text-center">Explore our diverse range of events and activities</p>
        <br />
        
      </div>
    </div>
  )
}

export default Events
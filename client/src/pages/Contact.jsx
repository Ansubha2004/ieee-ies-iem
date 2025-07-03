import React from 'react'
import orangebg2 from "../assets/designs/orangebg2.png"
import Joinbanner from "../components/Joinbanner.jsx";

function Contact() {
  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center z-[1] box-border  ">
      <div className="relative w-full flex justify-center   h-auto">
        <img src={orangebg2} className="absolute w-full h-[400px] z-[0]" alt="" />
        <Joinbanner/>
      </div>

    </div>
  )
}

export default Contact

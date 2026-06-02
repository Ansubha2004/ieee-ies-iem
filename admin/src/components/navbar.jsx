import React from 'react'
import ieeeieslogo from "../assets/images/ieeeieslogo.png"
import iemlogo from "../assets/images/iemlogo.png"
import uemlogo from "../assets/images/uemlogo.png"

function navbar() {
  return (
    <nav className="absolute w-full h-auto z-[1] p-3 flex justify-between items-center border-b-[2px] bg-gray-50 border-gray-300">
        <div className="flex gap-5 leading-[1.1]">
            <img src={ieeeieslogo} className="h-10" />
            <div>
                <p className="text-[1.2rem] notoserif text-orange-600">Industrial Electronics Society</p>
                <p className="text-[0.7rem] font-bold manrope text-blue-800 ">Institute of Engineering and Management, Kolkata</p>
            </div>
        </div>
        <div className="h-10 flex items-center gap-2">
            <img src={iemlogo} className="h-full" />
            <img src={uemlogo} className="h-full" />
        </div>
    </nav>
  )
}

export default navbar
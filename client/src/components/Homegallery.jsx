import React, { useState, useRef, useEffect } from "react";
import images from "../utils/homegallery.jsx";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";

function Homegallery() {

    const [index,setIndex]=useState(0);

    const scrollleft=()=>{
        setIndex((prev)=>{
            return (prev-1+images.length)%images.length;
        })
    }

    const scrollright=()=>{
        setIndex((prev)=>{
            return (prev+1)%images.length;
        })
    }

  return (
    <div className="full flex md:flex-row flex-col justify-center gap-5 md:gap-10 items-center ">
      <FiArrowLeftCircle onClick={scrollleft} size={70} className="arrowbutton md:block hidden" />
      <div className="w-full relative border-solid border-[7px] border-amber-700  p-[10px] sm:p-[15px] sm:w-[65%] mt-[30px] bg-yellow-500 aspect-[16/10]  ">
        <div className="h-full  min-w-full whitespace-nowrap overflow-hidden flex gap-5 bg-transparent">
          <img
            id={index}
            src={images[index]}
            className="h-full min-w-full "
            alt=""
          />
        </div>
      </div>
      <FiArrowRightCircle onClick={scrollright} size={70} className="arrowbutton md:block hidden" />
      <div className="md:hidden  flex justify-center gap-[5%] w-full">
        <FiArrowLeftCircle onClick={scrollleft} size={30} className="arrowbutton " />
        <FiArrowRightCircle onClick={scrollright} size={30} className="arrowbutton " />
      </div>
    </div>
  );
}

export default Homegallery;
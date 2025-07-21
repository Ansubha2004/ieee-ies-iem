import React, { useState, useRef, useEffect } from "react";
import images from "../utils/homegallery.jsx";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";

function Homegallery() {

  const [index, setIndex] = useState(0);

  const scrollleft = () => {
    setIndex((prev) => {
      return (prev - 1 + images.length) % images.length;
    })
  }

  const scrollright = () => {
    setIndex((prev) => {
      return (prev + 1) % images.length;
    })
  }

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center items-center mt-[30px]">
      {
        images.map((image, index) => (
          <div key={index} className="w-full md:w-[45%] lg:w-[30%] relative border-solid border-[7px] border-amber-700 p-[7px] bg-yellow-500 aspect-[16/10]  ">
            <div className="h-full  min-w-full whitespace-nowrap overflow-hidden flex gap-5 bg-transparent">
              <img
                id={index}
                src={image}
                className="h-full min-w-full "
                alt=""
              />
            </div>
          </div>
        ))
      }

    </div>
  );
}

export default Homegallery;
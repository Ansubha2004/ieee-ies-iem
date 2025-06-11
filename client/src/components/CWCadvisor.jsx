import React from 'react'
import Sourav from "../assets/cwc/Sourav.jpeg";
import cwc from "../data/cwc.json";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";

function CWCadvisor() {
  return (
    <div
          id="advisor"
          className="profilecard sm:flex-row flex-col"
        >
          <div className="hidden sm:block sm:w-[30%] rounded-[10px] overflow-hidden object-fit w-full">
            <img src={Sourav} className=" h-full " />
          </div>
          <div className="w-full flex flex-col items-center sm:block sm:w-[70%] h-auto sm:pl-[5%]">
            <p className="heading">{cwc[0].name}</p>
            <p className="font-bold text-center sm:text-left ">{cwc[0].role}</p>
            <br />
            <div className="sm:hidden  w-[90%] border-double border-[10px] border-yellow-600 rounded-full aspect-square flex justify-center overflow-hidden object-fit ">
              <img src={Sourav} className=" h-full scale-[1.2] " />
            </div>
            <div className="sm:hidden relative bottom-10 text-amber-100 flex gap-4 px-4 py-2 rounded-[10px] border-double border-[4px] bg-yellow-600 border-white  ">
              <a href={cwc[0].socialmedia[0].link} className="flex gap-2 items-center">
                <FaLinkedin size={30} />
              </a>
              <a href={`mailto:${cwc[0].socialmedia[1].link}`} className="flex gap-2 items-center ">
                <IoMdMailUnread size={36} />
              </a>
            </div>
            <p className="paratext">{cwc[0].description}</p>

            <div className="w-full mt-[48px] text-yellow-700 hidden sm:flex flex-col gap-1 font-[200] ">
              <div className="flex gap-2 items-center">
                <FaLinkedin size={30} />
                <a href={cwc[0].socialmedia[0].link}>
                  {" "}
                  {cwc[0].socialmedia[0].platform}
                </a>
              </div>
              <div className="flex gap-2 items-center ">
                <IoMdMailUnread size={30} />
                <a href={`mailto:${cwc[0].socialmedia[1].link}`}>
                  {cwc[0].socialmedia[1].link}
                </a>
              </div>
            </div>
          </div>
        </div>
  )
}

export default CWCadvisor

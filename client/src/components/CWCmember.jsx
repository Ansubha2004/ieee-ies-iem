import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";

function CWCmember({ name, position, description, image, linkedin, mail }) {
  return (
    <div className="w-full  sm:w-[45%] hover:scale-[1.01] transition-all lg:w-[30%] shadow-[0px_0px_7px_0px_rgba(0,0,0,0.2)] rounded-[15px] overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-100 flex flex-col">
      <div className="">
        <img src={image} className="w-full " />
      </div>
      <div className="w-full h-auto px-5 py-3">
        <div className="w-full">
          <div className="w-full flex justify-between">
            <div id="name">
              <p className="font-[600] whitespace-nowrap bg-gradient-to-br from-orange-700 to-amber-400 text-transparent bg-clip-text text-[1.6rem] sm:text-[1.1rem]">
                {name}
              </p>
              <div className="font-[700] whitespace-nowrap leading-4 text-[1rem] sm:text-[0.7rem] text-zinc-500 flex gap-1">
                <p className="text-black   ">Role:-</p>
                <p>{position}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href={linkedin}
                className="text-blue-500 active:scale-[0.95]  transition-all active:text-blue-300 hover:text-blue-300"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href={`mailto:${mail}`}
                className="text-red-800 active:scale-[0.95] transition-all active:text-red-400 hover:text-red-400"
              >
                <IoMdMailUnread size={35} />
              </a>
            </div>
          </div>

          <p className="my-4 paratext leading-5 text-left sm:leading-3.5 sm:text-justify font-[400] sm:font-[200] sm:text-[0.8rem]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CWCmember;

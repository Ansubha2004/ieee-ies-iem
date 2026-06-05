import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";

function CWCmember({ name, position, description, image, linkedin, mail }) {
  return (
    <div className="w-full hover:scale-[1.01] transition-all  shadow-md shadow-slate-200/80 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-100 flex flex-col border border-amber-100/60">
      <div className="">
        <img src={image} className="w-full " />
      </div>
      <div className="w-full h-auto px-5 py-3">
        <div className="w-full">
          <div className="w-full flex justify-between">
            <div id="name">
              <p className="member-name">
                {name}
              </p>
              <div className="whitespace-nowrap text-sm font-medium text-slate-500 flex gap-1 mt-0.5">
                <p className="text-slate-800">Role:-</p>
                <p className="text-blue-800">{position}</p>
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

          <p className="my-4 paratext text-left">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CWCmember;

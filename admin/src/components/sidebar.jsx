import React from "react";
import { MonitorCog } from "lucide-react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import ieeelogo from "../assets/images/ieeelogo.png"
function sidebar() {
  const options = [
    {
      name: "Dashboard Analytics",
      link: "/",
      icon: <IoIosArrowDroprightCircle />,
    },
    {
      name: "Event Details ",
      link: "/events",
      icon: <IoIosArrowDroprightCircle />,
    },
    {
      name: "CWC Details",
      link: "/cwcs",
      icon: <IoIosArrowDroprightCircle />,
    },
    {
      name: "Contact Page",
      link: "/contact",
      icon: <IoIosArrowDroprightCircle />,
    },
  ];

  return (
    <aside
      id="sidebar"
      className="h-full relative w-[20%] bg-gradient-to-br from-black to-blue-900 text-white border-box p-4"
    >
      <div className="space-y-3">
        <div className="flex w-full items-center justify-center gap-2 text-yellow-400 opacity-[0.7]">
          <MonitorCog size={30} />
          <p className="text-[1.3rem] oswald font-normal">ADMIN DASHBOARD</p>
        </div>
        <a
          href="https://ieee-ies-iem-sbc.vercel.app/"
          target="main"
          className="w-full rounded-[5px] border-[1px] box-border py-1 flex justify-center gap-2 items-center opacity-[0.6] buttonanimation1"
        >
          Live Preview
          <HiArrowTopRightOnSquare />
        </a>
      </div>
      <div className="w-full h-[1px] bg-orange-300 opacity-[0.3] my-6"></div>
      <div className="w-full space-y-2">
        {options.map((option, index) => (
          <NavLink
            key={index}
            to={option.link}
            className={({ isActive }) =>
              clsx(
                "flex gap-3 items-center text-[0.9rem] border-box opacity-[0.8] px-3 py-2 rounded-[7px] manrope ",
                isActive?"bg-gradient-to-br from-blue-800 text-blue-100 to-blue-500 transition-all linear":""
              )
            }
          >
            {option.icon}
            <p>{option.name}</p>
          </NavLink>
        ))}
      </div>
      <img src={ieeelogo} className="absolute bottom-3 right-5 h-7" />
    </aside>
  );
}

export default sidebar;

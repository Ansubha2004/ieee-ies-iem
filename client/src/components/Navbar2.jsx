import React, { useState, useRef } from "react";
import ieeeieslogo from "../assets/images/ieeeieslogo.png";
import { NavLink } from "react-router-dom";
import { ImMenu3 } from "react-icons/im";
import clsx from "clsx";
import iemlogo from "../assets/images/iemlogo.png";
import Navbaricons from "../components/Navbaricons.jsx";

function Navbar2() {
  const [active, setactive] = useState(false);

  const navRef = useRef();

  const handlefocus = () => {
    navRef.current.style.transform = active ? "scaleY(1)" : "scaleY(-1)";
    setactive(!active);
  };
  const handleClick = (e) => {
    handlefocus();
  };
  return (
    <nav
      id="nav2"
      className="sticky top-0 bg-white  Navbar2 z-[2] border-solid  border-black/20 border-b-[2px]"
    >
      <div className="w-full flex justify-between border-solid border-b-[2px] border-yellow-600">
        <div className="w-[50%] flex gap-10">
          <img src={ieeeieslogo} className=" h-[3.3rem] lg:h-[3.5rem] my-2" />
        </div>
        <Navbaricons additionalcss="sm:flex hidden" />
        <img
          src={iemlogo}
          className="sm:hidden  h-[3.3rem]  lg:h-[3.5rem] my-2"
        />
      </div>
      <div className="w-full px-3 flex justify-between  sm:hidden">
        <button
          ref={navRef}
          onClick={handlefocus}
          className={clsx(
            "active:text-amber-500 active:scale-x-[0.9] scale-y-[-1] text-yellow-700  transition-all duration-300 linear"
          )}
        >
          <ImMenu3 size={45} />
        </button>
        <Navbaricons />
      </div>
      <div className="sm:flex w-full justify-center  items-center py-1  hidden sm:gap-[1.2rem] lg:text-[1rem]  lg:gap-[1.6rem] font-[300] ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "linkanimate" : "")}
        >
          Home
        </NavLink>
        <div className="dotcomponent"></div>
        <NavLink
          to="/About"
          className={({ isActive }) => (isActive ? "linkanimate" : "")}
        >
          About
        </NavLink>
        <div className="dotcomponent"></div>
        <NavLink
          to="/Events"
          className={({ isActive }) => (isActive ? "linkanimate" : "")}
        >
          Events
        </NavLink>
        <div className="dotcomponent"></div>
        <NavLink
          to="/Memberinfo"
          className={({ isActive }) => (isActive ? "linkanimate" : "")}
        >
          Technical Committee
        </NavLink>
        <div className="dotcomponent"></div>
        <NavLink
          to="/Contact"
          className={({ isActive }) => (isActive ? "linkanimate" : "")}
        >
          Enquiry
        </NavLink>
      </div>

      <div
        className={clsx(
          "sm:hidden absolute top-[7.6rem] left-0   w-3/5 bg-zinc-100 flex flex-col items-center box-border text-[1.1rem] font-bold   transition-transform ease-in-out duration-400",
          active ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "linkanimate mobilenavbar" : "mobilenavbar")}
        >
          Home
        </NavLink>
       
        <NavLink
          to="/About"
          className={({ isActive }) => (isActive ? "linkanimate mobilenavbar" : "mobilenavbar")}
        >
          About
        </NavLink>
        
        <NavLink
          to="/Events"
          className={({ isActive }) => (isActive ? "linkanimate mobilenavbar" : "mobilenavbar")}
        >
          Events
        </NavLink>
        
        <NavLink
          to="/Memberinfo"
          className={({ isActive }) => (isActive ? "linkanimate mobilenavbar" : "mobilenavbar")}
        >
          Technical Committee
        </NavLink>
        
        <NavLink
          to="/Contact"
          className={({ isActive }) => (isActive ? "linkanimate mobilenavbar" : "mobilenavbar")}
        >
          Enquiry
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar2;

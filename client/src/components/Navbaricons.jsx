import React from "react";
import Button from "./Button";
import clsx from "clsx";
import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import linkedin from "../assets/icons/linkedin.png";
import iemlogo from "../assets/images/iemlogo.png";


function Navbaricons({ additionalcss }) {
  return (
    <div className={clsx("sm:w-[50%] justify-end flex gap-2 items-center py-1",additionalcss)}>
      <a href="">
        <img src={instagram} className="navbaricons iconanimate" alt="" />
      </a>
      <a href="">
        <img src={linkedin} className="navbaricons iconanimate" alt="" />
      </a>
      <a href="">
        <img src={facebook} className="navbaricons iconanimate" alt="" />
      </a>

      <Button
        Content="Join IEEE-IES"
        themecss="btn1 whitespace-nowrap sm:text-[1rem] text-[0.9rem]"
      />
      <img
        src={iemlogo}
        className="hidden sm:block  h-[3.3rem]  lg:h-[3.5rem] my-2"
      />
    </div>
  );
}

export default Navbaricons;

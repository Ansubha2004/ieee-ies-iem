import React from "react";
import Button from "./Button";
import clsx from "clsx";
import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import linkedin from "../assets/icons/linkedin.png";
import iemlogo from "../assets/images/iemlogo.png";
import uemlogo from "../assets/images/uemlogo.png";


function Navbaricons({ additionalcss }) {
  return (
    <div className={clsx("sm:w-auto justify-end flex gap-2 items-center py-1",additionalcss)}>
      <a target="main" href="https://www.instagram.com/ieee_ies_official?igsh=MTB0djBzdWdoOXFncA==">
        <img src={instagram} className="navbaricons iconanimate" alt="" />
      </a>
      <a target="main" href="https://www.linkedin.com/company/ieee-ies-iem/">
        <img src={linkedin} className="navbaricons iconanimate" alt="" />
      </a>
      <a target="main" href="https://www.facebook.com/profile.php?id=61577417579820&mibextid=ZbWKwL">
        <img src={facebook} className="navbaricons iconanimate" alt="" />
      </a>

      <Button
        Content="Join IEEE-IES"
        themecss="btn1 whitespace-nowrap sm:text-[1rem] text-[0.9rem]"
        click={()=>window.open("https://forms.gle/Z9jAjDcjha463atS8")}
      />
      <img
        src={iemlogo}
        className="hidden sm:block  h-[3.3rem]  lg:h-[3.5rem] my-2"
      />
      <img src={uemlogo} className="hidden sm:block  h-[3.2rem]  lg:h-[3.5rem] my-2" alt="" />
    </div>
  );
}

export default Navbaricons;

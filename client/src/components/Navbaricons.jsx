import React from "react";
import Button from "./Button";
import clsx from "clsx";
import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import linkedin from "../assets/icons/linkedin.png";
import iemlogo from "../assets/images/iemlogo.png";
import uemlogo from "../assets/images/uemlogo.png";
import contactData from "../data/contact.json";


function Navbaricons({ additionalcss }) {
  const { socialLinks } = contactData;

  return (
    <div className={clsx("sm:w-auto justify-end flex gap-2 items-center py-1",additionalcss)}>
      <a target="main" rel="noreferrer" href={socialLinks.instagram}>
        <img src={instagram} className="navbaricons iconanimate" alt="Instagram" />
      </a>
      <a target="main" rel="noreferrer" href={socialLinks.linkedin}>
        <img src={linkedin} className="navbaricons iconanimate" alt="LinkedIn" />
      </a>
      <a target="main" rel="noreferrer" href={socialLinks.facebook}>
        <img src={facebook} className="navbaricons iconanimate" alt="Facebook" />
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
      <img src={uemlogo} className="hidden sm:block  h-[3.1rem]  lg:h-[3.4rem] my-2" alt="" />
    </div>
  );
}

export default Navbaricons;

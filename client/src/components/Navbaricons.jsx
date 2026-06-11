import React, { useState, useEffect } from "react";
import Button from "./Button";
import clsx from "clsx";
import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import linkedin from "../assets/icons/linkedin.png";
import youtube from "../assets/icons/youtube.png";
import x from "../assets/icons/x.png";
import iemlogo from "../assets/images/iemlogo.png";
import uemlogo from "../assets/images/uemlogo.png";
import axios from "axios";

function Navbaricons({ additionalcss }) {
  const [socialLinks, setsociallinks] = useState([]);
  const icons = [linkedin, instagram, facebook, youtube, x];
  const url =
    import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${url}/socialmediaapi/getsocials`);
        const { success, message, enableddata, error } = response.data;
        if (success) {
          console.log(message);
          setsociallinks(enableddata);
        } else console.log(error);
      } catch (err) {
        console.log("API error fetching social media data");
        return;
      }
    };
    fetchdata();
  }, []);

  console.log();
  return (
    <div
      className={clsx(
        "sm:w-auto justify-end flex gap-2 items-center py-1",
        additionalcss,
      )}
    >
      {socialLinks.map((links, index) => (
        <a key={index} target="main" rel="noreferrer" href={links?.[1].url}>
          <img
            src={icons.filter((icon)=>{
              return links[0]===icon.split('/').pop().split(".")[0]
            })}
            className="navbaricons iconanimate"
            alt="LinkedIn"
          />
        </a>
      ))}

      <Button
        Content="Join IEEE-IES"
        themecss="btn1 whitespace-nowrap sm:text-[1rem] text-[0.9rem]"
        click={() => window.open("https://forms.gle/Z9jAjDcjha463atS8")}
      />
      <img
        src={iemlogo}
        className="hidden sm:block  h-[3.3rem]  lg:h-[3.5rem] my-2"
      />
      <img
        src={uemlogo}
        className="hidden sm:block  h-[3.1rem]  lg:h-[3.4rem] my-2"
        alt=""
      />
    </div>
  );
}

export default Navbaricons;

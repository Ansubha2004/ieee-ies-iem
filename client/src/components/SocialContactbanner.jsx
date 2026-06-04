import { useState, useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import contactData from "../data/contact.json";

function Socialbanner() {
  const [width, setwidth] = useState(window.innerWidth);
  const { social } = contactData;

  useEffect(() => {
    const onResize = () => setwidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const iconSize = width > 640 ? 30 : 15;

  return (
    <div className="w-full sm:w-[50%] flex flex-col justify-between gap-4">
      <div>
        <p className="heading sm:text-left text-center">{social.heading}</p>
        <p className="paratext sm:text-left text-center">{social.subheading}</p>
        <br className="sm:hidden" />
      </div>
      <div className="w-full flex flex-col gap-4">
        <a href={`mailto:${social.email}`} className="w-full flex gap-3 animation2">
          <div className="contacticondesign">
            <SiGmail size={iconSize} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-amber-800 font-semibold text-sm tracking-wide">{social.emailLabel}</p>
            <p className="paratext">{social.email}</p>
          </div>
        </a>
        <a
          href={social.mapsLink}
          target="_blank"
          rel="noreferrer"
          className="w-full flex gap-3 animation2"
        >
          <div className="contacticondesign">
            <FaLocationDot size={iconSize} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-amber-800 font-semibold text-sm tracking-wide">{social.locationTitle}</p>
            <p className="paratext text-sm">{social.address}</p>
          </div>
        </a>
      </div>
      <div>
        <iframe
          src={social.mapEmbedUrl}
          className="w-full h-auto min-h-[200px] rounded-md border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="IEM Kolkata map"
        />
      </div>
    </div>
  );
}

export default Socialbanner;

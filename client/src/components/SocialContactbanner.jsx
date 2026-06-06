import { useState, useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";


function Socialbanner() {
  const [width, setwidth] = useState(window.innerWidth);
  const social={
    "heading": "Need Help? Ping Us!",
    "subheading": "Whether it's about membership, events, or collaboration, we're here to help.",
    "emailLabel": "Official Email Address",
    "email": "ieeeies.iem@gmail.com",
    "locationTitle": "Institute Of Engineering and Management",
    "address": "Iem Management Building, EP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091, India",
    "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1713840319635!2d88.43737349999999!3d22.572692500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027514cd20d659%3A0x4b66eefc1cb3ed78!2sIEM%20Kolkata!5e0!3m2!1sen!2sin!4v1751603697812!5m2!1sen!2sin"

  }

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

import { useState, useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

function Socialbanner() {
  const [width, setwidth] = useState(window.innerWidth);
  const [socials, setsocials] = useState({
    email: "",
    institute: "",
    address: "",
    mapurl: "",
  });

  const url =
    import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";

  useEffect(() => {
    const onResize = () => setwidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    

    const fetchsocialdata = async () => {
      try {
        const response = await axios.get(`${url}/contactapi/getcontact`);
        const thedata = response.data.data;
        setsocials((prev) => ({
          ...prev,
          email: thedata.email,
          institute: thedata.institute,
          address: thedata.address,
          mapurl: thedata.mapurl,
        }));
      } catch (error) {
        console.log("API error retrieving social contact data:", error);
      }
    };

    fetchsocialdata();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const iconSize = width > 640 ? 30 : 15;

  return (
    <div className="w-full sm:w-[50%] flex flex-col justify-between gap-4">
      <div>
        <p className="heading sm:text-left text-center">Need Help? Ping Us!</p>
        <p className="paratext sm:text-left text-center">
          Whether it's about membership, events, or collaboration, we're here to
          help.
        </p>
        <br className="sm:hidden" />
      </div>
      <div className="w-full flex flex-col gap-4">
        <a
          href={`mailto:${socials.email}`}
          className="w-full flex gap-3 animation2"
        >
          <div className="contacticondesign">
            <SiGmail size={iconSize} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-amber-800 font-semibold text-sm tracking-wide">
              Official Email Address
            </p>
            <p className="paratext">{socials.email}</p>
          </div>
        </a>
        <div className="w-full flex gap-3 animation2">
          <div className="contacticondesign">
            <FaLocationDot size={iconSize} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-amber-800 font-semibold text-sm tracking-wide">
              {socials.institute}
            </p>
            <p className="paratext text-sm">{socials.address}</p>
          </div>
        </div>
      </div>
      <div>
        <iframe
          src={socials.mapurl || undefined}
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

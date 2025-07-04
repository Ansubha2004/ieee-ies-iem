import React from "react";
import ieeeieslogo from "../assets/images/ieeeieslogo.png";
import iemlogo from "../assets/images/iemlogo.png";
import uemlogo from "../assets/images/uemlogo.png";

import clsx from "clsx"
import instagram from "../assets/icons/instagram.png";
import linkedin from "../assets/icons/linkedin.png";
import gmail from "../assets/icons/gmail.png";
import facebook from "../assets/icons/facebook.png";
import location from "../assets/icons/location.png";


function Socialbanner({ additionalcss }) {
    return (
        <div className={clsx("w-[50%] mr-10 h-auto  rounded-[10px] bg-amber-50 box-border p-8 sm:p-5 border-amber-500 flex flex-col justify-around items-center", additionalcss)}>
            <p className="heading text-[2.5rem] px-3  w-fit  sm:text-[1.5rem] text-center text-amber-800 border-solid border-amber-500  border-l-[4px] border-r-[4px]">
                Connect with Us
            </p>

            <div className="w-full flex justify-center gap-8">
                <img src={iemlogo} className="object-contain h-[90px] sm:h-[55px] my-7 sm:my-2" />
                <img src={ieeeieslogo} className="object-contain h-[90px] sm:h-[55px] my-7 sm:my-2" />
                <img src={uemlogo} className="object-contain h-[90px] sm:h-[55px] my-7 sm:my-2" />
            </div>


            <div className="w-full flex gap-4 items-center">
                <div className="overflow-hidden border-solid border-zinc-300 border-[2px]">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1713840319635!2d88.43737349999999!3d22.572692500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027514cd20d659%3A0x4b66eefc1cb3ed78!2sIEM%20Kolkata!5e0!3m2!1sen!2sin!4v1751603697812!5m2!1sen!2sin" className="w-full h-auto" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                </div>
                <div className="w-[50%] flex flex-col gap-2">
                    <a href="mailto:ieeeies.iem@gmail.com" className="flex items-center gap-2">

                        <img src={gmail} className="h-[20px] iconanimate textshadow1" alt="" />

                        <p className="paratext text-[1.3rem] sm:text-[0.7rem] text-amber-700">ieeeies.iem@gmail.com</p>
                    </a>
                    <a href="https://www.google.com/maps/place/IEM+Kolkata/@22.5726925,88.4347986,17z/data=!3m1!4b1!4m6!3m5!1s0x3a027514cd20d659:0x4b66eefc1cb3ed78!8m2!3d22.5726925!4d88.4373735!16s%2Fg%2F11fcv9lb9h?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D" className="flex items-center gap-2">

                        <img src={location} className="h-[30px] iconanimate textshadow1" alt="" />

                        <p className="paratext text-left text-[1.3rem] sm:text-[0.7rem] text-amber-700 ">IEM Management House, D‑1, Sector V
                            Salt Lake Electronics Complex, Kolkata–700 091
                            West Bengal, India</p>
                    </a>
                    <div className="w-full flex justify-start gap-2 ">
                        <a
                            target="main"
                            href="https://www.linkedin.com/company/ieee-ies-iem/"
                            className="iconanimate icon"
                        >
                            <img src={linkedin} className="h-[30px] iconanimate textshadow1" alt="" />
                        </a>
                        <a
                            target="main"
                            href="https://www.instagram.com/ieee_ies_official?igsh=MTB0djBzdWdoOXFncA=="
                            className="iconanimate icon"
                        >
                            <img src={instagram} className="h-[30px] iconanimate textshadow1" alt="" />
                        </a>
                        <a
                            target="main"
                            href="https://www.facebook.com/profile.php?id=61577417579820&mibextid=ZbWKwL"
                            className="iconanimate icon"
                        >
                            <img src={facebook} className="h-[30px] iconanimate textshadow1" alt="" />
                        </a>
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default Socialbanner;
import React,{useState,useEffect} from "react";
import ieeeieslogo from "../assets/images/ieeeieslogo.png";
import iemlogo from "../assets/images/iemlogo.png";
import uemlogo from "../assets/images/uemlogo.png";
import clsx from "clsx"
import instagram from "../assets/icons/instagram.png";
import linkedin from "../assets/icons/linkedin.png";
import facebook from "../assets/icons/facebook.png";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";



function Socialbanner({ additionalcss }) {

    const [width,setwidth]=useState(window.innerWidth);
    useEffect(()=>{
        setwidth(window.innerWidth);
    },[])

    return (
        <div className="w-full sm:w-[50%] flex flex-col justify-between gap-4">
            <div>
                <p className="heading sm:text-left text-center">Need Help? Ping Us!</p>
                <p className="paratext text-[0.8rem] sm:text-left text-center">Whether it's about membership, events, or collaboration, we’re here to help.</p>
            </div>
            <div className="w-full flex flex-col gap-4">
                <a href="mailto:ieeeies.iem@gmail.com" id="gmail" className="w-full flex gap-3">
                    <div className="contacticondesign">
                        <SiGmail size={(width>640)?30:15} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-amber-700 font-bold">Official Email Address</p>
                        <p className="paratext text-[0.8rem]">ieeeies.iem@gmail.com</p>
                    </div>
                </a>
                <a href="https://www.google.com/maps/place/IEM+Kolkata/@22.5740893,88.4345229,16.62z/data=!4m6!3m5!1s0x3a027514cd20d659:0x4b66eefc1cb3ed78!8m2!3d22.5726925!4d88.4373735!16s%2Fg%2F11fcv9lb9h?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" id="location" className="w-full flex gap-3">
                    <div className="contacticondesign">
                        <FaLocationDot size={(width>640)?30:15} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-amber-700 font-bold">Institute Of Engineering and Management</p>
                        <p className="paratext text-[0.7rem]">Iem Management Building, EP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091, India</p>
                    </div>
                </a>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1713840319635!2d88.43737349999999!3d22.572692500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027514cd20d659%3A0x4b66eefc1cb3ed78!2sIEM%20Kolkata!5e0!3m2!1sen!2sin!4v1751603697812!5m2!1sen!2sin" className="w-full h-auto" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}

export default Socialbanner;
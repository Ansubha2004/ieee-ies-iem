import React from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExport } from "react-icons/ai";
import Button from "../components/Button.jsx";
import clsx from "clsx";
import Contactform from "../components/contactform.jsx";
import Socialmediaform from "../components/socialmediaform.jsx";

function contactpage() {
  const enquirystats = [
    {
      heading: "Total Enquiries",
      design: "border-green-00 text-green-700 bg-green-50",
      count: "5",
    },
    {
      heading: "Unread Enquiries",
      design: "border-blue-700 text-blue-700 bg-blue-50",
      count: "5",
    },
    {
      heading: "Resolved Enquiries",
      design: "border-red-700 text-red-700 bg-red-50",
      count: "5",
    },
  ];

  return (
    <section id="contact" className="mt-15 p-5 pb-10 min-h-0">
      <div className="w-full flex gap-10 justify-between items-start">
        <div className="flex-1">
          <p className="heading  oswald">Contact Page Dashboard</p>
          <p className="paratext">
            Manage contact information, social media links, and communication
            details displayed on the website
          </p>
        </div>
        <div className="grid grid-cols-2 translate-y-3  gap-3 ">
          
          <div className=" col-span-2 flex gap-2 justify-end">
            {enquirystats.map((stat, index) => (
              <div
                key={index}
                className={clsx(
                  "border border-[1px] rounded-[7px] text-right box-border py-1 px-3",
                  stat.design,
                )}
              >
                <p className="text-[0.6rem] manrope ">{stat.heading}</p>
                <p className="text-[1.4rem] leading-7 oswald font-bold">
                  {stat.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
 
      <div className="w-full flex gap-4">
        <div className="contactboxes">
          <p className="subheading text-[1rem] text-blue-800">
            CONTACT INFORMATION
          </p>
          
          <Contactform />
        </div>
        <div className="contactboxes flex flex-col justify-between">
          <p className="subheading text-[1rem] text-blue-800">
            SOCIAL MEDIA LINKS
          </p>
          <Socialmediaform/>
        </div>
      </div>
    </section>
  );
}

export default contactpage;

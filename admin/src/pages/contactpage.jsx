import React from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExport } from "react-icons/ai";
import Button from "../components/Button.jsx"
import clsx from "clsx";

function contactpage() {


  const enquirystats=[{
    heading:"Total Enquiries",
    design:"border-green-00 text-green-700 bg-green-50",
    count:"5"
  },{
    heading:"Unread Enquiries",
    design:"border-blue-700 text-blue-700 bg-blue-50",
    count:"5"
  },{
    heading:"Resolved Enquiries",
    design:"border-red-700 text-red-700 bg-red-50",
    count:"5"
  }]


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
          <Button
            themecss="px-3 py-1 text-[0.9rem] bg-gradient-to-br from-blue-800 to-black text-white rounded-[4px]  buttonanimation1"
            
            icon={<IoMdAdd />}
            Content="Add Social Links"
          />
          <Button
            themecss="px-3 py-1 text-[0.9rem] bg-gradient-to-br from-blue-800 to-black text-white rounded-[4px] buttonanimation1"
            icon={<AiOutlineExport />}
            Content="Export Enquiries"
          />
          <div className=" col-span-2 flex gap-2 justify-end">
            {
              enquirystats.map((stat,index)=>(
                <div key={index} className={clsx("border border-[1px] rounded-[7px] text-right box-border py-1 px-3",stat.design)}>
                  <p className="text-[0.6rem] manrope ">{stat.heading}</p>
                  <p className="text-[1.4rem] leading-7 oswald font-bold">{stat.count}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <br />
        dbhejbd fnr ch  efnb4e 
    </section>
  );
}

export default contactpage;

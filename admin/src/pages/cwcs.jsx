import React, { useState } from "react";
import Button from "../components/Button.jsx";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExport } from "react-icons/ai";
import clsx from "clsx";
import Addmemberform from "../components/Addmemberform.jsx";
import Getcwcdata from "../components/Getcwcdata.jsx";

function cwcs() {
  const [formview, setformview] = useState(false);
  const [count,setcount]=useState([null,null])
  const handleaddform = (e) => {
    if (e.target.innerText == "Close") setformview(false);
    else setformview(true);
  };

  return (
    <section id="cwc" className="mt-15 p-5 pb-10 min-h-0">
      <div className="w-full flex gap-10 justify-between items-start">
        <div className="flex-1">
          <p className="heading  oswald">CWC Member Management</p>
          <p className="paratext">
            Add, update, and manage Core Working Committee member information
            displayed on the website.
          </p>
        </div>
        <div className="flex translate-y-3  gap-3 ">
          <Button
            themecss="px-3 py-1 text-[0.9rem] bg-gradient-to-br from-blue-800 to-black text-white rounded-[4px]  buttonanimation1"
            click={handleaddform}
            icon={<IoMdAdd />}
            Content="Add Members"
          />
          <Button
            themecss="px-3 py-1 text-[0.9rem] bg-gradient-to-br from-blue-800 to-black text-white rounded-[4px] buttonanimation1"
            icon={<AiOutlineExport />}
            Content="Export Details"
          />
        </div>
      </div>
      <br />
      <div
        id="addmemberform"
        className={clsx(
          "w-full h-auto py-2 px-3 bg-gray-100",
          formview ? "mb-6" : "hidden",
        )}
      >
        <div className="flex justify-between items-start">
          <p className="text-[1.1rem] font-[500] ">
            Add New Member
            <span className="font-normal italic text-[0.8rem]">
              {" "}
              - Fill all credentials
            </span>
          </p>
          <Button
            themecss="px-2 rounded-[7px] translate-y-1 buttonanimation1 border-red-700 text-red-700  text-[0.9rem] border-[2px] "
            click={handleaddform}
            Content="Close"
          />
        </div>
        <Addmemberform setformview={setformview} />
      </div>
      <div id="memberdata">
        <div className="flex justify-between items-center ">
          <p className="subheading text-[1rem] text-blue-800">
            MEMBER INFORMATION
          </p>
          <div className="flex paratext gap-3 text-[0.7rem] manrope">
          <p className="text-green-700">Active CWC Members: <b className="text-[0.9rem]">{count[0]}</b></p>
          <p className="text-red-600">Active Executives: <b className="text-[0.9rem]">{count[1]}</b></p>
          </div>
        </div>
        <Getcwcdata setcount={setcount} />
      </div>
    </section>
  );
}

export default cwcs;

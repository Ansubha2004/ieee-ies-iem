import React, { useState } from "react";
import Button from "../components/Button.jsx";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExport } from "react-icons/ai";
import clsx from "clsx";
import Addmemberform from "../components/Addmemberform.jsx";

function cwcs() {
  const [formview, setformview] = useState(false);
  const handleaddform = (e) => {
    if (e.target.innerText == "Close") setformview(false);
    else setformview(true);
  };

  return (
    <section id="cwc" className="mt-15 p-5">
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
        id="form"
        className={clsx(
          "w-full h-auto py-2 px-3 bg-gray-200",
          formview ? "" : "hidden",
        )}
      >
        <div id="addmemberform" className="flex justify-between items-start">
          <p className="text-[1.1rem] font-[500] ">
            Add New Member
            <span className="font-normal italic"> - Fill all credentials</span>
          </p>
          <Button
            themecss="px-2 rounded-[3px] translate-y-1 buttonanimation1 border-red-700 text-red-700  text-[0.9rem] border-[2px] "
            click={handleaddform}
            Content="Close"
          />
        </div>
        <AddMemberform />
      </div>
    </section>
  );
}

export default cwcs;

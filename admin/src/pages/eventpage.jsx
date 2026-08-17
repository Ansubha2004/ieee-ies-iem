import React,{useState,useEffect} from "react";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExport } from "react-icons/ai";
import axios from "axios"
import Addeventform from "../components/Addeventform";
import Geteventdata from "../components/Geteventdata";
import clsx from "clsx";

function eventpage() {

  const [formview, setformview] = useState(false);
  const [count,setcount]=useState([null,null])
  const handleaddform = (e) => {
    if (e.target.innerText == "Close") setformview(false);
    else setformview(true);
  };

  return <section id="events" className="mt-15 p-5 pb-10 min-h-0">
    <div className="w-full flex gap-10 justify-between items-start">
        <div className="flex-1">
          <p className="heading  oswald">Events Management Section</p>
          <p className="paratext">
            Add, update, and manage event related informations
            displayed on the website.
          </p>
        </div>
        <div className="flex translate-y-3  gap-3 ">
          <Button
            themecss="px-3 py-1 text-[0.9rem] bg-gradient-to-br from-blue-800 to-black text-white rounded-[4px]  buttonanimation1"
            click={handleaddform}
            icon={<IoMdAdd />}
            Content="Add Event"
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
        id="addeventform"
        className={clsx(
          "w-full h-auto py-2 px-3 bg-gray-100",
          formview ? "mb-6" : "hidden",
        )}
      >
        <div className="flex justify-between items-start">
          <p className="text-[1.1rem] font-[500] ">
            Event Details
            <span className="font-normal italic text-[0.8rem]">
              {" "}
              - Fill up all the credentials properly for record
            </span>
          </p>
          <Button
            themecss="px-2 rounded-[7px] translate-y-1 buttonanimation1 border-red-700 text-red-700  text-[0.9rem] border-[2px] "
            click={handleaddform}
            Content="Close"
          />
        </div>
        <Addeventform setformview={setformview} />
      </div>
      <div id="eventdata">
        <div className="flex justify-between items-center ">
          <p className="subheading text-[1rem] text-blue-800">
            CHAPTER'S EVENT INFORMATION
          </p>
          <div className="flex paratext gap-3 text-[0.7rem] manrope">
          <p className="text-green-700">Upcoming Events: <b className="text-[0.9rem]">{count[0]}</b></p>
          <p className="text-red-600">Events Completed: <b className="text-[0.9rem]">{count[1]}</b></p>
          </div>
        </div>
        <Geteventdata setcount={setcount} />
      </div>
  </section>;
}

export default eventpage;

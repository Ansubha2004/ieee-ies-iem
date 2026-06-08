import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";
import axios from "axios";
import Linkedin from "../assets/icons/linkedin.png";
import Instagram from "../assets/icons/instagram.png";
import Facebook from "../assets/icons/facebook.png";
import Youtube from "../assets/icons/youtube.png";
import X from "../assets/icons/x.png";
import { CiSaveUp2 } from "react-icons/ci";



function socialmediaform() {
  const [formdata, setformdata] = useState({
    email: "",
    institute: "",
    address: "",
    mapurl: "",
  });
  const url =
    import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";
  useEffect(() => {
    const getcontact = async () => {
      try {
        const response = await axios.get(`${url}/contactapi/getcontact`);
        const thedata = response.data.data;
        if (thedata)
          setformdata({
            email: thedata.email,
            institute: thedata.institute,
            address: thedata.address,
            mapurl: thedata.mapurl,
          });
      } catch (err) {
        console.log("Error retrieving contact data and address:", err);
      }
    };

    getcontact();
  }, []);
  console.log(formdata);
  const handlechange = (e) => {
    const { name, value } = e.target;
    const shallowcopy = { ...formdata };
    shallowcopy[name] = value;
    setformdata(shallowcopy);
  };

  const submitchanges = async (e) => {
    e.preventDefault();
    const { email, institute, address, mapurl } = formdata;
    if (!email || !institute || !address || !mapurl) {
      console.log("Kindly fill all the credentials");
    }

    try {
      const response = await axios.put(`${url}/contactapi/updatecontact`, {
        email,
        institute,
        address,
        mapurl,
      });
      const { success, message, data } = response.data;
      if (success) {
        console.log("Contact Data posted successfully");
        setformdata((prev) => ({
          ...prev,
          email: data.email,
          institute: data.institute,
          address: data.address,
          mapurl: data.mapurl,
        }));
      }
    } catch (error) {
      console.log("API error updating contact details:", error);
    }
  };
  return (
    <form method="put" onSubmit={submitchanges} className=" w-full">
      <div className="flex flex-col gap-6 manrope">
        <div className="flex gap-3">
          <label htmlFor="email">
            <img
              src={Linkedin}
              className="navbaricons iconanimate"
              alt="Linkedin"
            />
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder="e.g. ieee.ies.iem@gmail.com"
            className="inputbox3 "
            onChange={handlechange}
            value={formdata.email}
          />
        </div>

        <div className="flex gap-3">
          <label htmlFor="institute">
            <img src={Instagram} className="navbaricons iconanimate" alt="" />
          </label>
          <input
            required
            id="institute"
            name="institute"
            type="text"
            placeholder="e.g. Institute of Engineering and Management"
            className="inputbox3"
            onChange={handlechange}
            value={formdata.institute}
          />
        </div>

        <div className="flex gap-3">
          <label htmlFor="mapurl">
            <img src={Facebook} className="navbaricons iconanimate" alt="" />
          </label>
          <input
            required
            id="mapurl"
            name="mapurl"
            type="url"
            placeholder="https://maps.google.com/..."
            className="inputbox3"
            onChange={handlechange}
            value={formdata.mapurl}
          />
        </div>

        <div className="flex gap-3">
          <label htmlFor="mapurl">
            <img src={Youtube} className="navbaricons iconanimate" alt="" />
          </label>
          <input
            required
            id="mapurl"
            name="mapurl"
            type="url"
            placeholder="https://maps.google.com/..."
            className="inputbox3"
            onChange={handlechange}
            value={formdata.mapurl}
          />
        </div>

        <div className="flex gap-3">
          <label htmlFor="mapurl">
            <img
              src={X}
              className="navbaricons iconanimate"
              alt=""
            />
          </label>
          <input
            required
            id="mapurl"
            name="mapurl"
            type="url"
            placeholder="https://maps.google.com/..."
            className="inputbox3"
            onChange={handlechange}
            value={formdata.mapurl}
          />
        </div>
      </div>

      <div className=" flex mt-10 justify-start">
        <Button
          type="submit"
          themecss="bg-blue-700 rounded-[5px] buttonanimation1 text-white text-[0.8rem] px-4 py-2 manrope"
          Content="Save Links"
          icon={<CiSaveUp2 className="scale-[1.3]" />}
        />
      </div>
    </form>
  );
}

export default socialmediaform;

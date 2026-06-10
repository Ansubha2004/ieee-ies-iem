import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";
import axios from "axios";
import { CiSaveUp2 } from "react-icons/ci";

function Contactform() {
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
      return ;
    }

    try {
      
      const response = await axios.put(
        `${url}/contactapi/updatecontact`,
        {
          email,institute,address,mapurl
        }
      );
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
    <form method="put" onSubmit={submitchanges} className="mt-2 w-full">
      <div className="flex flex-col gap-3 manrope">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-[0.8rem] font-[600] text-blue-700 "
          >
            Email
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

        <div className="flex flex-col gap-1">
          <label
            htmlFor="institute"
            className="text-[0.8rem] font-[600] text-blue-700 "
          >
            Institute Name
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

        <div className="flex flex-col gap-1">
          <label
            htmlFor="address"
            className="text-[0.8rem] font-[600] text-blue-700 "
          >
            Address
          </label>
          <textarea
            required
            id="address"
            name="address"
            rows="3"
            placeholder="Full institute address"
            className="inputbox3 h-auto py-2 resize-none"
            onChange={handlechange}
            value={formdata.address}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="mapurl"
            className="text-[0.8rem] font-[600] text-blue-700 "
          >
            Google Map URL
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
      <br />
      <div className=" flex justify-start">
        <Button
          type="submit"
          themecss="bg-blue-700 rounded-[5px] buttonanimation1 text-white text-[0.8rem] px-4 py-2 manrope"
          Content="Save Changes"
          icon={<CiSaveUp2 className="scale-[1.3]" />}
          
        />
      </div>
    </form>
  );
}

export default Contactform;

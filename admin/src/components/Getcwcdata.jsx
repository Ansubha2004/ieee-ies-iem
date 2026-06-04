import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import clsx from "clsx";
import Button from "../components/Button.jsx"

function Getcwcdata() {
  const [cwcdata, setcwcdata] = useState([]);
  const url =import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";
  useEffect(() => {
    const fetchcwcdata = async () => {
      try {
        
        const getcwcdata = await axios.get(`${url}/cwcapi/getallcwc`);
        setcwcdata(getcwcdata.data.data);
      } catch (err) {
        console.log("API error fetching data....", err);
      }
    };
    fetchcwcdata();
  }, []);

  const deletemember=async (cwc)=>{
    try{
      const {id,name}=cwc;
      const response=await axios.delete(`${url}/cwcapi/deletecwc/${id}/${name}`);
      const {success,message,error}=response.data;
      if(!success)
      {
        console.log("Delete unsuccessful: ",error);
        return;
      }
      console.log("Deletion successful:",message)
      setcwcdata(prev=>prev.filter(member=>member.id!==id && member.name!==name))
    }
    catch(err)
    {
      console.log("API error deleting cwc member data: ",err)
    }
  }

  return (
    <div className="w-full h-auto mt-5">
      <div className="space-y-4">
        {cwcdata.map((cwc, index) => (
          <div
            key={index}
            className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex gap-5">
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={cwc.image}
                        alt={cwc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-900">
                        {cwc.name}
                      </h3>

                      <p className="text-sm text-gray-600">{cwc.role}</p>

                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {cwc.id}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <Button themecss="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600" Content="Edit" />
                    <Button themecss="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600" Content="Delete" click={()=>deletemember(cwc)} />
                      
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">LinkedIn:</span>{" "}
                    {cwc.socialmedia?.[0]?.link}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {cwc.socialmedia?.[1]?.link}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-3 bg-gray-50 border rounded-lg p-3">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {cwc.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Getcwcdata;

import React,{useState,useEffect} from "react";
import CWCcontent from "../components/CWCcontent.jsx";
import CWCintro from "../components/CWCintro.jsx";
import CWCadvisor from "../components/CWCadvisor.jsx";
import CWCmember from "../components/CWCmember.jsx";
import orangebg from "../assets/designs/orangebg.png";
import axios from "axios";

function CWC() {

  const [cwcdata,setcwcdata]=useState([]);
  useEffect(()=>{
    const fetchcwc=async ()=>{
      try
    {
      const result=await axios.get("https://ieee-ies-iem.onrender.com/cwcapi/getallcwc");
      setcwcdata(result.data.data); 
    }
    catch(error)
    {
      console.error("Error Fetching data",error);
    }
    }
    fetchcwc();

  },[])

  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center z-[1] box-border  ">
      <div className="absolute w-full   h-auto">
        <img src={orangebg} className="w-full h-[130px]" alt="" />
      </div>
      <div className="relative mt-[30px] sm:mt-[65px] flex flex-col gap-7 px-[3%]">
        <div className="w-full flex gap-5 relative  justify-center">
          <CWCcontent />
          <CWCintro />
        </div>
        {cwcdata.length > 0 && <CWCadvisor advisor={cwcdata[0]} />}
        <div
          id="cwcmembers"
          className="profilecard shadow-none bg-gradient-to-br from-white to-white py-0 sm:flex-wrap sm:flex-row justify-around gap-y-7  flex-col"
        >
          <div className="w-full mb-2">
            <p className="heading text-center ">CWC Members</p>
            <p className="role-text text-center">
              Core Student members of IEEE-IES
            </p>
          </div>
          {cwcdata.slice(1).map((member, index) => (
            <CWCmember
              key={index}
              name={member.name}
              position={member.role}
              image={member.image}
              linkedin={member.socialmedia[0].link}
              mail={member.socialmedia[1].link}
              description={member.description}
            />
          ))}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default CWC;

import React from "react";
import cwc from "../data/cwc.json";
import CWCcontent from "../components/CWCcontent.jsx";
import CWCintro from "../components/CWCintro.jsx";
import CWCadvisor from "../components/CWCadvisor.jsx";
import CWCmember from "../components/CWCmember.jsx";
import { cwcimage } from "../assets/cwc/cwc.js";

function CWC() {
  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center z-[1] box-border  ">
      <div className="absolute w-full bg-gradient-to-br from-orange-700 to-amber-400  h-[130px]"></div>
      <div className="relative mt-[30px] sm:mt-[65px] flex flex-col gap-7 px-[3%]">
        <div className="w-full flex gap-5 relative  justify-center">
          <CWCcontent />
          <CWCintro />
        </div>
        <CWCadvisor />
        <div
          id="cwcmembers"
          className="profilecard shadow-none bg-gradient-to-br from-white to-white py-0 sm:flex-wrap sm:flex-row justify-around gap-y-7  flex-col"
        >
          <div className="w-full mb-2">
            <p className="heading text-center ">CWC Members</p>
            <p className="font-bold text-center ">
              Core Student members of IEEE-IES
            </p>
          </div>
          {cwc.slice(1).map((member,index) => (
            <CWCmember
              key={index}
              name={member.name}
              position={member.role}
              image={cwcimage[index]}
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

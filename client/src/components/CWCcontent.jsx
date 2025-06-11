import React from "react";



function CWCcontent() {

  const scrollTo=(id)=>{
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="hidden bg-gradient-to-b from-white to-yellow-50 md:flex flex-col gap-2 min-w-[20%] box-border p-5 h-fit shadow-[0px_0px_15px_0px_rgba(0,0,0,0.3)] z-[2] rounded-[10px]  bg-white">
      <p className="font-bold  ">Content :-</p>
      <ol className="flex flex-col gap-1">
        <li>
          <button onClick={()=>scrollTo("#advisor")} className="animatedbutton1"> Founder/Advisor</button>
        </li>
        <li>
          <button onClick={()=>scrollTo("#cwcmembers")} className="animatedbutton1"> CWC Members</button>
        </li>
      </ol>
    </div>
  );
}

export default CWCcontent;

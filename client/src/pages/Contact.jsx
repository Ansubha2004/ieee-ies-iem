import React from 'react'
import orangebg2 from "../assets/designs/orangebg2.png"
import Joinbanner from "../components/Joinbanner.jsx";
import Button from "../components/Button.jsx";
import Socialcontactbanner from "../components/SocialContactbanner.jsx";

function Contact() {
  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center z-[1] box-border  ">
      <div className="relative w-full flex justify-center   h-auto">
        <img src={orangebg2} className="absolute w-full h-[400px] z-[0]" alt="" />
        <Joinbanner />
      </div>
      <div className="px-[5%] w-full pt-[30px] text-center">
        <p className="heading">Need Help? Ping Us!</p>
        <p className="paratext text-[0.8rem] text-center">Whether it's about membership, events, or collaboration, we’re here to help.</p>
        <br />
      </div>
      <div className="px-[5%] pb-[30px] w-full relative flex justify-between">
        <Socialcontactbanner/>
        <div className="w-[50%]  relative flex flex-col justify-center relative">
          <form >
            <div className="flex flex-col mb-3">
              <label htmlFor="name" className="font-[600] text-amber-700 mx-1">Enter Name</label>
              <input id="name" type="text" placeholder="Ex: Raj Sen" name="name" className="inputbox" />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="email" className="font-[600] text-amber-700 mx-1">Enter Email Address</label>
              <input id="email" type="text" placeholder="Ex: name@gmail.com" name="email" className="inputbox" />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="message" className="font-[600] text-amber-700 mx-1">Enter Message</label>
              <textarea id="message" type="text" placeholder="Type your query..." name="message" className="inputbox h-[100px]" ></textarea>
            </div>
            <Button themecss="btn1 px-[7%]  py-2" Content="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

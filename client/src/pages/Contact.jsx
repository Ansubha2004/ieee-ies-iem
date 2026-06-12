import React,{useState} from 'react'
import orangebg2 from "../assets/designs/orangebg2.png"
import Joinbanner from "../components/Joinbanner.jsx";
import Button from "../components/Button.jsx";
import Socialcontactbanner from "../components/SocialContactbanner.jsx";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { successmessage, errormessage } from "../utils/notification.jsx";

function Contact() {
  const formCopy={
    "nameLabel": "Enter Name",
    "namePlaceholder": "Ex: Raj Sen",
    "emailLabel": "Enter Email Address",
    "emailPlaceholder": "Ex: name@gmail.com",
    "subjectLabel":"Enter Subject",
    "subjectPlaceholder":"Type Subject",
    "messageLabel": "Enter Message",
    "messagePlaceholder": "Type your query...",
    "submitText": "Submit"
  }
  

  const [formdata,setformdata]=useState({
    name:"",
    email:"",
    subject:"",
    message:""
  })

  const handlechange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const shallowcopy={...formdata};
    shallowcopy[name]=value;
    setformdata(shallowcopy);
  }

  const handlesubmission=async (e)=>{
    e.preventDefault();
    const {name,email,subject,message}=formdata;
    if(!name.trim() || !email.trim() || !subject.trim() || !message.trim())
    {
      errormessage("Kindly fill all the credentials");
      console.log("Kindly fill up")
    }
    try{
        const apiUrl = import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";
        const response=await axios.post(`${apiUrl}/formapi/submitdata`,formdata,
          {
          headers: {
            "Content-Type": "application/json",
          }
        }
        )
        const {success,error,message}=response.data;
        if (success) {
        console.log("Data posted successfully");
        successmessage("Thanks for contacting! Will reach out to you soon ");
        //✅ Reset form data here
        setformdata({
          name: "",
          email: "",
          subject:"",
          message: "",
        });
      }
      if (error) {
        errormessage("Glitch occured");
        console.log("Error occured while data posting");
      }
    }
    catch(err)
    {
      console.log("Form api handling error");
    }
  }



  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center z-[1] box-border  ">
      <div className="relative w-full flex justify-center   h-auto">
        <img src={orangebg2} className="absolute w-full h-[400px] z-[0]" alt="" />
        <Joinbanner />
      </div>
      <div className="px-[5%] py-[30px] w-full relative flex sm:flex-row flex-col justify-between gap-5">
        <Socialcontactbanner />
        <div className="w-full sm:w-[50%]  relative flex flex-col justify-center relative">
          <form onSubmit={handlesubmission} className="w-full grid grid-cols-2 gap-2">
            <div className="flex flex-col mb-3 sm:col-span-1 col-span-2">
              <label htmlFor="name" className="text-sm font-semibold text-amber-800 tracking-wide mx-1">{formCopy.nameLabel}</label>
              <input id="name" type="text" placeholder={formCopy.namePlaceholder} name="name" onChange={handlechange} value={formdata.name} className="inputbox" />
            </div>
            
            <div className="flex flex-col mb-3 sm:col-span-1 col-span-2">
              <label htmlFor="email" className="text-sm font-semibold text-amber-800 tracking-wide mx-1">{formCopy.emailLabel}</label>
              <input id="email" type="text" onChange={handlechange} value={formdata.email} placeholder={formCopy.emailPlaceholder} name="email" className="inputbox" />
            </div>
            <div className="flex flex-col mb-3 col-span-2">
              <label htmlFor="subject" className="text-sm font-semibold text-amber-800 tracking-wide mx-1">{formCopy.subjectLabel}</label>
              <input id="subject" type="text" placeholder={formCopy.subjectPlaceholder} name="subject" onChange={handlechange} value={formdata.subject} className="inputbox" />
            </div>
            <div className="flex flex-col mb-5 col-span-2">
              <label htmlFor="message" className="text-sm font-semibold text-amber-800 tracking-wide mx-1">{formCopy.messageLabel}</label>
              <textarea id="message" type="text" onChange={handlechange} value={formdata.message} placeholder={formCopy.messagePlaceholder} name="message" className="inputbox py-2 h-[130px]" ></textarea>
            </div>
            <Button type="submit" themecss="btn1 sm:w-fit sm:col-span-1 col-span-2  px-[27%] justify-center py-2" Content={formCopy.submitText} />
          </form>
        </div>
      </div>
       <ToastContainer />
    </div>
  )
}

export default Contact

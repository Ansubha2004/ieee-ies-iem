import React,{useState} from 'react'
import orangebg2 from "../assets/designs/orangebg2.png"
import Joinbanner from "../components/Joinbanner.jsx";
import Button from "../components/Button.jsx";
import Socialcontactbanner from "../components/SocialContactbanner.jsx";
import contactData from "../data/contact.json";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { successmessage, errormessage } from "../utils/notification.jsx";

function Contact() {
  const { form: formCopy } = contactData;

  const [formdata,setformdata]=useState({
    name:"",
    email:"",
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
    const {name,email,message}=formdata;
    if(!name.trim() || !email.trim() || !message.trim())
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
          <form onSubmit={handlesubmission}>
            <div className="flex flex-col mb-3">
              <label htmlFor="name" className="font-[600] text-amber-700 mx-1">{formCopy.nameLabel}</label>
              <input id="name" type="text" placeholder={formCopy.namePlaceholder} name="name" onChange={handlechange} value={formdata.name} className="inputbox" />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="email" className="font-[600] text-amber-700 mx-1">{formCopy.emailLabel}</label>
              <input id="email" type="text" onChange={handlechange} value={formdata.email} placeholder={formCopy.emailPlaceholder} name="email" className="inputbox" />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="message" className="font-[600] text-amber-700 mx-1">{formCopy.messageLabel}</label>
              <textarea id="message" type="text" onChange={handlechange} value={formdata.message} placeholder={formCopy.messagePlaceholder} name="message" className="inputbox h-[130px]" ></textarea>
            </div>
            <Button type="submit" themecss="btn1 sm:w-auto w-full px-[7%] justify-center py-2" Content={formCopy.submitText} />
          </form>
        </div>
      </div>
       <ToastContainer />
    </div>
  )
}

export default Contact

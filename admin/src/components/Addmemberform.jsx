import React,{useState} from "react";
import Button from "./Button.jsx";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { FilesIcon } from "lucide-react";

function Addmemberform() {

  const [formdata,setformdata]=useState({
    id:"",
    name:"",
    role:"",
    image:"",
    linkedin:"",
    email:"",
    description:""
  });

  const handlechange=(e)=>{
    const {name,value,type,files}=e.target;
    const shallowcopy={...formdata};
    shallowcopy[name]=type==="file"?files[0]:value;
    setformdata(shallowcopy);
  }

  const handlesubmit=async (e)=>{
    e.preventDefault();
    const {id,name,role,image,linkedin,email,description}=formdata;
    if(!id.trim() || !name.trim() || !role.trim() || !image || !linkedin.trim() || !email.trim() || description.trim() )
    {
      console.log("Kindly fill the credentials...")
    }
    try
    {
        const url="https://ieee-ies-iem.onrender.com";
        const response=await axios.post(`${url}/cwcapi/addcwc`,formdata,
          {
            headers:{
              "Content-Type":"application/json"
            }
          }
        );
        const {success,error,data}=response.data;
        if (success) {
          console.log("Data posted successfully");
         
          //✅ Reset form data here
          setformdata({
            name: "",
            email: "",
            message: "",
          });
        }
        if (error) {
        
          console.log("Error occured while data posting");
        }
    }
    catch(err){
      console.log("API Error posting new member .... : ",err);
    }
  }

  return (
    <form method="post" encType="multipart/form-data" className="mt-4 w-full">
      <div className="grid sm:grid-cols-2 gap-2 manrope">
        <div className="flex flex-col">
          <label htmlFor="id" className="text-[0.8rem] font-[600] text-amber-700 mx-1">
            Enter ID
          </label>
          <input
          required
            id="id"
            name="id"
            type="number"
            min="0"
            max="30"
            placeholder="e.g. 0 for advisor, 1+ for members"
            className="inputbox"
            onChange={handlechange}
            value={formdata.id}

          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-[0.8rem] font-[600] text-amber-700 mx-1">
            Full name
          </label>
          <input
          required
            id="name"
            name="name"
            type="text"
            placeholder="Member full name"
            className="inputbox"
            onChange={handlechange}
            value={formdata.name}


          />
        </div>

        <div className="flex flex-col sm:col-span-1">
          <label htmlFor="role" className="text-[0.8rem] font-[600] text-amber-700 mx-1">
            Role / position
          </label>
          <input
          required
            id="role"
            name="role"
            type="text"
            placeholder="e.g. Chairperson, Secretary, Advisor"
            className="inputbox"
            onChange={handlechange}
            value={formdata.role}


          />
        </div>

        <div className="flex flex-col sm:col-span-1">
          <label htmlFor="image" className="text-[0.8rem] font-[600] text-amber-700 mx-1">
            Profile photo
          </label>
          <input
          required
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handlechange}
            className="inputbox h-auto py-2 file:mr-4  file:px-2 file:rounded-[5px]  file:bg-amber-600 file:text-white file:cursor-pointer"
          />
        </div>

        

        <div className="flex flex-col">
          <label htmlFor="linkedin" className="text-[0.8rem] font-[600] text-amber-700 mx-1">
            LinkedIn profile URL
          </label>
          <input
          required
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            className="inputbox"
            onChange={handlechange}
            value={formdata.linkedin}

          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mail" className="text-[0.8rem] font-[600] text-amber-700 mx-1">
            Email address
          </label>
          <input
          required
            id="mail"
            name="email"
            type="email"
            placeholder="member@example.com"
            className="inputbox"
            onChange={handlechange}
            value={formdata.email}

          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label
            htmlFor="description"
            className="font-[600] text-[0.8rem] text-amber-700 mx-1"
          >
            Description
          </label>
          <textarea
          required
            id="description"
            name="description"
            rows="5"
            placeholder="Short bio for display..."
            className="inputbox h-[130px] resize-y"
            onChange={handlechange}
            value={formdata.description}

          />
        </div>
       
      </div>

      <div className="flex flex-wrap gap-3 mt-5 mb-3 justify-end">
        <Button
          type="submit"
          submit={handlesubmit}
          themecss="btn1 flex items-center justify-center gap-2 px-6 py-2 text-[0.9rem]"
          icon={<IoMdAdd />}
          Content="Save member"
        />
      </div>
    </form>
  );
}

export default Addmemberform;

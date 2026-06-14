import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExport } from "react-icons/ai";
import Button from "../components/Button.jsx";
import clsx from "clsx";
import axios from "axios";
import Contactform from "../components/contactform.jsx";
import Socialmediaform from "../components/socialmediaform.jsx";
import Enquirycard from "../components/enquirycard.jsx";

function contactpage() {
  const [count, setcount] = useState({
    total: 0,
    new: 0,
    read: 0,
    responded: 0,
  });
  const [replyid, setreplyid] = useState(null);
  const [reply, setreply] = useState(null);
  const [enquiries, setenquiries] = useState([]);
  const enquirystats = [
    {
      heading: "Total Enquiries",
      design: "border-green-00 text-green-700 bg-green-50",
      count: count.total,
    },
    {
      heading: "Unread Enquiries",
      design: "border-blue-700 text-blue-700 bg-blue-50",
      count: count.new,
    },
    {
      heading: "Resolved Enquiries",
      design: "border-red-700 text-red-700 bg-red-50",
      count: count.responded,
    },
  ];

  const url =
    import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${url}/enquiryapi/getenquiries`);
        const { success, message, count, data } = response.data;
        if (success) {
          console.log("Success:", message);
          if (Number(count) > 0) {
            setenquiries(data);
            setcount({
              total: Number(count),
              new: data.filter((enquiry) => enquiry.status === "new").length,
              read: data.filter((enquiry) => enquiry.status === "in-progress")
                .length,
              responded: data.filter(
                (enquiry) => enquiry.status === "responded",
              ).length,
            });
          } else {
            setenquiries([]);
            setcount({
              total: Number(count),
              new: 0,
              read: 0,
              responded: 0,
            });
          }
        } else return;
      } catch (error) {
        console.log("API error fetching enquiries", error);
        return;
      }
    };
    fetchdata();
  }, []);

  const handlereply = async (id) => {
    if(replyid===id)
    {
      setreplyid(null)
      return ;
    }
    setreplyid(id);
    try {
      const response = await axios.put(`${url}/enquiryapi/updatestatus/${id}`, {
        status: "in-progress",
      });
      const { success, message } = response.data;
      if (success) {
        console.log(message);
        setenquiries((prev) =>
          prev.map((enquiry) =>
            enquiry._id === id
              ? { ...enquiry, status: "in-progress" }
              : enquiry,
          ),
        );
      }
    } catch (err) {
      console.log("Status updated failed");
      return;
    }
  };
  const ondelete = async (id) => {
    try {
      const response = await axios.delete(
        `${url}/enquiryapi/deleteenquiry/${id}`,
      );
      const { success, message, data } = response.body;
      if (success) {
        console.log(message);

        setenquiries((prev) => prev.filter((enquiry) => enquiry._id !== id));
      }
    } catch (error) {
      console.log("Error deleteig the specific message:", error);
      return;
    }
  };

  return (
    <section id="contact" className="mt-15 p-5 pb-10 min-h-0">
      <div className="w-full flex gap-10 justify-between items-start">
        <div className="flex-1">
          <p className="heading  oswald">Contact Page Dashboard</p>
          <p className="paratext">
            Manage contact information, social media links, and communication
            details displayed on the website
          </p>
        </div>
        <div className="grid grid-cols-2 translate-y-3  gap-3 ">
          <div className=" col-span-2 flex gap-2 justify-end">
            {enquirystats.map((stat, index) => (
              <div
                key={index}
                className={clsx(
                  "border border-[1px] rounded-[7px] text-right box-border py-1 px-3",
                  stat.design,
                )}
              >
                <p className="text-[0.6rem] manrope ">{stat.heading}</p>
                <p className="text-[1.4rem] leading-7 oswald font-bold">
                  {stat.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />

      <div className="w-full flex gap-4">
        <div className="contactboxes">
          <p className="subheading text-[1rem] text-blue-800">
            CONTACT INFORMATION
          </p>

          <Contactform />
        </div>
        <div className="contactboxes flex flex-col justify-between">
          <p className="subheading text-[1rem] text-blue-800">
            SOCIAL MEDIA LINKS
          </p>
          <Socialmediaform />
        </div>
      </div>
      <br />

      <div>
        <div>
          <p className="subheading text-[1rem] text-orange-800">ENQUIRY LIST</p>
        </div>
        <br />
        <div className="flex flex-col gap-3">
          {enquiries.map((enquiry, index) => (
            <Enquirycard
              key={enquiry._id}
              enquiry={enquiry}
              deleteenquiry={() => ondelete(enquiry._id)}
              handlereply={() => handlereply(enquiry._id)}
              replymode={replyid===enquiry._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default contactpage;

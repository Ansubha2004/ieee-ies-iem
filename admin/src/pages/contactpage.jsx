import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineExport } from "react-icons/ai";
import Button from "../components/Button.jsx";
import clsx from "clsx";
import axios from "axios";
import Contactform from "../components/contactform.jsx";
import Socialmediaform from "../components/socialmediaform.jsx";
import Enquirycard from "../components/enquirycard.jsx";
import {MessageSquare} from "lucide-react";

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
  const [search, setsearch] = useState("");
  const [statusfilter, setstatusfilter] = useState("");

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
    if (replyid === id) {
      setreplyid(null);
      return;
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
      const { success, message, data } = response.data;
      if (success) {
        console.log(message);
        setenquiries((prev) => prev.filter((enquiry) => enquiry._id !== id));
      }
    } catch (error) {
      console.log("Error deleteig the specific message:", error);
      return;
    }
  };

  const handlesearch = async (e) => {
    const value = e.target.value;

    setsearch(value);

    try {
      const response = await axios.get(
        `${url}/enquiryapi/searchenquiry?query=${value}`,
      );

      const { success, message, data } = response.data;
      console.log(response.data.data);
      if (success) {
        console.log(message);
        setenquiries(data);
      }
    } catch (error) {
      console.log("Search error:", error);
    }
  };

  const statusfiltering = (e) => {
    const value = e.target.value;
    setstatusfilter(value);
  };

  const clickreply = async (id) => {
    try {
      const response = await axios.put(`${url}/enquiryapi/updatestatus/${id}`, {
        status: "responded",
      });
      const { success, message } = response.data;
      if (success) {
        console.log(message);
        setenquiries((prev) =>
          prev.map((enquiry) =>
            enquiry._id === id ? { ...enquiry, status: "responded" } : enquiry,
          ),
        );
      }
    } catch (err) {
      console.log("Status updated failed");
      return;
    }
  };

  const replysubmission = async (id) => {
    try {
      const response = await axios.put(`${url}/enquiryapi/replyenquiry/${id}`, {
        reply,
      });
      const { success, message } = response.data;
      if (success) {
        console.log(message);
        setenquiries((prev) =>
          prev.map((enquiry) =>
            enquiry._id === id ? { ...enquiry, reply } : enquiry,
          ),
        );

        setreply("");
        setreplyid(null);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Error replying to message");
      return false;
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

      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="subheading text-[1rem] text-orange-800">ENQUIRY LIST</p>

          <div className="flex flex-1 items-center justify-end gap-3">
            <input
              type="text"
              name="search"
              onChange={handlesearch}
              value={search}
              placeholder="Search by name, email, subject..."
              className="w-72 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
            />

            <div className="border border-gray-300 box-border px-3 py-2  text-sm ">
              <select
                name="statusfilter"
                value={statusfilter}
                onChange={statusfiltering}
                className=" outline-none focus:border-blue-500 "
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="responded">Responded</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <div className="flex flex-col gap-3">
          {(count.total) === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16">
              <div className="mb-4 rounded-full bg-blue-100 p-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No Enquiries Found
              </h3>

              <p className="mt-2 max-w-md text-center text-sm text-gray-500">
                There are currently no enquiries available. New contact requests
                submitted through the website will appear here.
              </p>
            </div>
          ) : (
            enquiries
              .filter((enquiry) =>
                statusfilter === "" ? true : enquiry.status === statusfilter,
              )
              .map((enquiry, index) => (
                <Enquirycard
                  key={enquiry._id}
                  enquiry={enquiry}
                  deleteenquiry={() => ondelete(enquiry._id)}
                  handlereply={() => handlereply(enquiry._id)}
                  replymode={replyid === enquiry._id}
                  clickreply={() => clickreply(enquiry._id)}
                  reply={reply}
                  setreply={setreply}
                  replysubmission={() => replysubmission(enquiry._id)}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}

export default contactpage;

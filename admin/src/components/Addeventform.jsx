import React, { useState } from "react";
import Button from "./Button.jsx";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { successmessage, errormessage } from "../util/notification.js";

function Addeventform({ setformview }) {
  const [formdata, setformdata] = useState({
    id: "",
    link: "",
    poster: "",
    name: "",
    description: "",
    venue: "",
    eventdate: "",
    gallery: "",
    details: "",
    status: "",
  });

  const handlechange = (e) => {
    const { name, value, type, files } = e.target;
    const shallowcopy = { ...formdata };
    shallowcopy[name] = type === "file" ? files[0] : value;
    setformdata(shallowcopy);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const {
      id,
      link,
      poster,
      name,
      description,
      venue,
      eventdate,
      gallery,
      details,
      status,
    } = formdata;

    if (
      !String(id).trim() ||
      !link.trim() ||
      !poster ||
      !name.trim() ||
      !description.trim() ||
      !venue.trim() ||
      !eventdate.trim() ||
      !gallery.trim() ||
      !details.trim() ||
      !status
    ) {
      errormessage("Kindly fill the credentials...");
      return;
    }

    const formattedDate = new Date(eventdate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    try {
      const newdata = new FormData();

      newdata.append("id", id);
      newdata.append("link", link.trim());
      newdata.append("poster", poster);
      newdata.append("name", name.trim());
      newdata.append("description", description.trim());
      newdata.append("venue", venue.trim());
      newdata.append("eventdate", formattedDate.trim());
      newdata.append("gallery", gallery.trim());
      newdata.append("details", details.trim());
      newdata.append("status", status);

      const url =
        import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";

      const response = await axios.post(`${url}/eventapi/addevent`, newdata);

      const { success, message, data } = response.data;

      if (success) {
        successmessage("Event posted successfully");
        setformview(false);

        setformdata({
          id: "",
          link: "",
          poster: "",
          name: "",
          description: "",
          venue: "",
          eventdate: "",
          gallery: "",
          details: "",
          status: "",
        });
      } else {
        errormessage("Error:", message || "Failed to save event");
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      errormessage("API Error posting new event:", msg);
    }
  };

  return (
    <form
      method="post"
      onSubmit={handlesubmit}
      encType="multipart/form-data"
      className="mt-4 w-full"
    >
      <div className="grid sm:grid-cols-2 gap-2 manrope">
        <div className="flex flex-col">
          <label
            htmlFor="id"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Enter ID
          </label>

          <input
            required
            id="id"
            name="id"
            type="number"
            min="0"
            placeholder="Enter event ID"
            className="inputbox"
            onChange={handlechange}
            value={formdata.id}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Event name
          </label>

          <input
            required
            id="name"
            name="name"
            type="text"
            placeholder="Enter event name"
            className="inputbox"
            onChange={handlechange}
            value={formdata.name}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="link"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Registration Link
          </label>

          <input
            required
            id="link"
            name="link"
            type="url"
            placeholder="https://example.com/evenform "
            className="inputbox"
            onChange={handlechange}
            value={formdata.link}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="poster"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Event poster
          </label>

          <input
            required
            id="poster"
            name="poster"
            type="file"
            accept="image/*"
            onChange={handlechange}
            className="inputbox h-auto py-2 file:mr-4 file:px-2 file:rounded-[5px] file:bg-amber-600 file:text-white file:cursor-pointer"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="venue"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Venue
          </label>

          <input
            required
            id="venue"
            name="venue"
            type="text"
            placeholder="Enter event venue or mode of event. Eg: Online / Hybrid"
            className="inputbox"
            onChange={handlechange}
            value={formdata.venue}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="eventdate"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Event date
          </label>

          <input
            required
            id="eventdate"
            name="eventdate"
            type="date"
            placeholder="e.g. 25 August 2026"
            className="inputbox"
            onChange={handlechange}
            value={formdata.eventdate}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="gallery"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Gallery link
          </label>

          <input
            required
            id="gallery"
            name="gallery"
            type="url"
            placeholder="https://example.com/gallery"
            className="inputbox"
            onChange={handlechange}
            value={formdata.gallery}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Description
          </label>

          <select
            required
            id="description"
            name="description"
            type="text"
            placeholder="https://example.com/event"
            className="inputbox"
            onChange={handlechange}
            value={formdata.description}
          >
            <option value="">Select type of event</option>
            <option value="SEMINAR">SEMINAR</option>
            <option value="WORKSHOP">WORKSHOP</option>
            <option value="INDUSTRY VISIT">INDUSTRY VISIT</option>
            <option value="AWARNESS PROGRAM">AWARNESS PROGRAM</option>
            <option value="FLAGSHIP CELEBRATION">FLAGSHIP CELEBRATION</option>
            <option value="CHARITY EVENT">CHARITY EVENT</option>
            <option value="TECHNICAL WEEK">TECHNICAL WEEK</option>
            <option value="DISTINGUISHED LECTURE">DISTINGUISHED LECTURE</option>
            <option value="HACKATHON/COMPETITION">HACKATHON/COMPETITION</option>
            <option value="OTHERS">OTHERS</option>
          </select>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label
            htmlFor="details"
            className="font-[600] text-[0.8rem] text-amber-700 mx-1"
          >
            Event details
          </label>

          <textarea
            required
            id="details"
            name="details"
            rows="5"
            placeholder="Enter complete event details..."
            className="inputbox h-[130px] resize-y"
            onChange={handlechange}
            value={formdata.details}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-3 mb-3 justify-between items-end">
        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="text-[0.8rem] font-[600] text-amber-700 mx-1"
          >
            Event status
          </label>

          <select
            required
            id="status"
            name="status"
            className="inputbox"
            onChange={handlechange}
            value={formdata.status}
          >
            <option value="">Select Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <Button
          type="submit"
          themecss="btn1 flex items-center justify-center gap-2 px-6 py-2 text-[0.9rem]"
          icon={<IoMdAdd />}
          Content="Save event"
        />
      </div>
    </form>
  );
}

export default Addeventform;

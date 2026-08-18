import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbPhotoEdit } from "react-icons/tb";
import Button from "../components/Button.jsx";
import { successmessage, errormessage } from "../util/notification.js";

function Geteventdata({ setcount }) {
  const [eventdata, seteventdata] = useState([]);
  const [editId, seteditId] = useState("");
  const [editformdata, seteditformdata] = useState(null);
  const [preview, setpreview] = useState("");

  const url =
    import.meta.env.VITE_API_URL || "https://ieee-ies-iem.onrender.com";

  // Convert word-based date to YYYY-MM-DD for input type="date"
  const convertToInputDate = (dateString) => {
    if (!dateString) return "";

    // Already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Convert YYYY-MM-DD to word-based date
  const convertToWordDate = (dateString) => {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
  };

  useEffect(() => {
    const fetcheventdata = async () => {
      try {
        const response = await axios.get(`${url}/eventapi/getallevents`);

        console.log("EVENT API RESPONSE:", response.data);

        // Safely extract array
        const events = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];

        seteventdata(events.reverse());

        const upcoming = events.filter(
          (event) => event.status === "upcoming",
        ).length;

        const completed = events.filter(
          (event) => event.status === "completed",
        ).length;

        if (setcount) {
          setcount([upcoming, completed]);
        }
      } catch (err) {
        console.error("API error fetching event data:", err);
        errormessage("API error fetching event data....");
        seteventdata([]);
      }
    };

    fetcheventdata();
  }, [url, setcount]);

  const editbutton = (event) => {
    if (editId === event._id) {
      seteditId("");
      seteditformdata(null);

      if (preview) {
        URL.revokeObjectURL(preview);
        setpreview("");
      }

      return;
    }

    seteditId(event._id);

    seteditformdata({
      id: event.id ?? "",
      link: event.link ?? "",
      poster: event.poster ?? "",
      name: event.name ?? "",
      description: event.description ?? "",
      venue: event.venue ?? "",
      eventdate: convertToInputDate(event.eventdate),
      gallery: event.gallery ?? "",
      details: event.details ?? "",
      status: event.status ?? "",
    });

    if (preview) {
      URL.revokeObjectURL(preview);
      setpreview("");
    }
  };

  const handlechange = (e) => {
    const { name, value, type, files } = e.target;

    const shallowcopy = { ...editformdata };

    shallowcopy[name] = type === "file" ? files?.[0] || "" : value;

    seteditformdata(shallowcopy);

    if (files?.[0] && type === "file") {
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setpreview(URL.createObjectURL(files[0]));
    }
  };

  const submitchange = async () => {
    if (!editformdata) return;

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
    } = editformdata;

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
      errormessage("Dont leave the credentials blank...");
      return;
    }

    try {
      const newdata = new FormData();

      newdata.append("id", id);
      newdata.append("link", link.trim());

      // Only send poster if a new file was selected
      if (poster instanceof File) {
        newdata.append("poster", poster);
      }

      newdata.append("name", name.trim());
      newdata.append("description", description.trim());
      newdata.append("venue", venue.trim());

      // Store word-based date in MongoDB
      newdata.append("eventdate", convertToWordDate(eventdate));

      newdata.append("gallery", gallery.trim());
      newdata.append("details", details.trim());
      newdata.append("status", status);

      const response = await axios.put(
        `${url}/eventapi/updateevent/${editId}`,
        newdata,
      );

      const { success, message } = response.data;

      if (success) {
        successmessage("Event updated successfully");

        seteventdata((prev) =>
          Array.isArray(prev)
            ? prev.map((event) =>
                event._id === editId
                  ? {
                      ...event,
                      id,
                      link,
                      name,
                      description,
                      venue,
                      eventdate: convertToWordDate(eventdate),
                      gallery,
                      details,
                      status,
                      poster: preview || event.poster,
                    }
                  : event,
              )
            : [],
        );

        seteditId("");
        seteditformdata(null);

        if (preview) {
          URL.revokeObjectURL(preview);
        }

        setpreview("");
      } else {
        errormessage(message || "Failed to save event");
      }
    } catch (err) {
      console.error("API error updating events:", err);

      errormessage(
        err.response?.data?.message || "API error updating events...",
      );
    }
  };

  const deleteevent = async (eventId) => {
    try {
      const response = await axios.delete(
        `${url}/eventapi/deleteevent/${eventId}`,
      );

      const { success, message, error } = response.data;

      if (!success) {
        errormessage(error || "Delete unsuccessful");
        return;
      }

      successmessage(message || "Deletion successful");

      seteventdata((prev) =>
        Array.isArray(prev)
          ? prev.filter((eventitem) => eventitem._id !== eventId)
          : [],
      );
    } catch (err) {
      console.error("API error deleting event data:", err);

      errormessage(
        err.response?.data?.message || "API error deleting event...",
      );
    }
  };

  return (
    <div className="w-full h-auto mt-5">
      <div className="space-y-4">
        {(Array.isArray(eventdata) ? eventdata : []).map((event, index) => (
          <div
            key={event._id || index}
            className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex gap-5 flex-1">
                    {/* Poster */}
                    <div className="relative w-32 h-24 overflow-hidden rounded-lg shrink-0">
                      <img
                        src={
                          event._id === editId && preview
                            ? preview
                            : event.poster
                        }
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />

                      {editId === event._id && (
                        <label className="absolute bottom-1 right-1 w-8 h-8 flex items-center justify-center bg-black/70 rounded-full cursor-pointer z-[5] hover:bg-black/90 transition-colors">
                          <input
                            className="hidden"
                            name="poster"
                            type="file"
                            accept="image/*"
                            onChange={handlechange}
                          />

                          <TbPhotoEdit className="text-white text-lg" />
                        </label>
                      )}
                    </div>

                    <div className="flex flex-col flex-1">
                      {/* Event Name */}
                      {editId === event._id && editformdata ? (
                        <input
                          onChange={handlechange}
                          type="text"
                          className="w-full md:w-1/2 text-lg font-bold text-blue-900 border-blue-700/30 bg-blue-50 inputbox2"
                          name="name"
                          value={editformdata.name}
                        />
                      ) : (
                        <h3 className="text-lg font-bold text-blue-900">
                          {event.name}
                        </h3>
                      )}

                      {/* Venue */}
                      {editId === event._id && editformdata ? (
                        <input
                          onChange={handlechange}
                          className="w-full md:w-1/2 text-sm text-gray-600 mt-1 border-gray-200 bg-gray-100 inputbox2"
                          type="text"
                          name="venue"
                          value={editformdata.venue}
                          placeholder="Event venue"
                        />
                      ) : (
                        <p className="text-sm text-gray-600 mt-1">
                          📍 {event.venue}
                        </p>
                      )}

                      {/* ID, Date and Status */}
                      <div className="flex flex-wrap gap-3">
                        {/* ID */}
                        {editId === event._id && editformdata ? (
                          <input
                            onChange={handlechange}
                            type="number"
                            min="0"
                            className="w-15 text-center mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 inputbox2"
                            name="id"
                            value={editformdata.id}
                          />
                        ) : (
                          <span className="w-fit mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            ID: {event.id}
                          </span>
                        )}

                        {/* Event Date */}
                        {editId === event._id && editformdata ? (
                          <input
                            onChange={handlechange}
                            type="date"
                            className="mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-700 inputbox2"
                            name="eventdate"
                            value={editformdata.eventdate}
                          />
                        ) : (
                          <span className="mt-2 py-1 px-3 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                            📅 {event.eventdate}
                          </span>
                        )}

                        {/* Status */}
                        {editId === event._id && editformdata ? (
                          <select
                            onChange={handlechange}
                            className="text-center mt-2 rounded-full text-xs font-medium bg-blue-100 border-green-500 text-green-700 inputbox2 border-[2px]"
                            name="status"
                            value={editformdata.status}
                          >
                            <option value="">Select Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`text-center mt-2 py-1 px-3 rounded-full text-xs font-medium border-[2px]
                            ${
                              event.status === "upcoming"
                                ? "bg-green-50 border-green-500 text-green-700"
                                : event.status === "ongoing"
                                  ? "bg-blue-50 border-blue-500 text-blue-700"
                                  : event.status === "completed"
                                    ? "bg-gray-50 border-gray-500 text-gray-700"
                                    : "bg-red-50 border-red-500 text-red-700"
                            }`}
                          >
                            {event.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-5 flex gap-2 mt-3 md:mt-0">
                    <Button
                      themecss={`px-4 py-2 buttonanimation1 rounded-md ${
                        editId === event._id
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-amber-500 hover:bg-amber-600"
                      } text-white`}
                      Content={editId === event._id ? "Cancel" : "Edit"}
                      click={() => editbutton(event)}
                    />

                    <Button
                      themecss={`px-4 py-2 rounded-md buttonanimation1 ${
                        editId === event._id
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white`}
                      Content={editId === event._id ? "Submit" : "Delete"}
                      click={() =>
                        editId === event._id
                          ? submitchange()
                          : deleteevent(event._id)
                      }
                    />
                  </div>
                </div>

                {/* Event Link & Gallery */}
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  {/* Event Link */}
                  <div>
                    <span className="font-semibold">Event Link:</span>{" "}
                    {editId === event._id && editformdata ? (
                      <input
                        onChange={handlechange}
                        type="url"
                        className="mt-1 w-full text-sm py-1 text-gray-600 border-gray-200 bg-gray-100 inputbox2"
                        name="link"
                        value={editformdata.link}
                        placeholder="https://example.com/event"
                      />
                    ) : (
                      <span className="break-all">
                        <a href={event.link} target="main" rel="noreferrer">
                          {event.link}
                        </a>
                      </span>
                    )}
                  </div>

                  {/* Gallery */}
                  <div>
                    <span className="font-semibold">Gallery:</span>{" "}
                    {editId === event._id && editformdata ? (
                      <input
                        onChange={handlechange}
                        type="url"
                        className="mt-1 w-full text-sm py-1 text-gray-600 border-gray-200 bg-gray-100 inputbox2"
                        name="gallery"
                        value={editformdata.gallery}
                        placeholder="https://example.com/gallery"
                      />
                    ) : (
                      <span className="break-all">
                        <a href={event.gallery} target="main" rel="noreferrer">
                          {event.gallery}
                        </a>
                      </span>
                    )}
                  </div>
                  {/* Description */}
                  <div >
                    <span className="font-semibold text-sm text-gray-700">
                      Description:
                    </span>

                    {editId === event._id && editformdata ? (
                      <select
                        onChange={handlechange}
                        className="mt-1 w-full text-sm py-2 text-gray-600 border-gray-200 bg-gray-100 inputbox2"
                        name="description"
                        value={editformdata.description}
                      >
                        <option value="">Select Event Type</option>
                        <option value="SEMINAR">SEMINAR</option>
                        <option value="WORKSHOP">WORKSHOP</option>
                        <option value="INDUSTRY VISIT">INDUSTRY VISIT</option>
                        <option value="AWARNESS PROGRAM">
                          AWARNESS PROGRAM
                        </option>
                        <option value="FLAGSHIP CELEBRATION">
                          FLAGSHIP CELEBRATION
                        </option>
                        <option value="CHARITY EVENT">CHARITY EVENT</option>
                        <option value="TECHNICAL WEEK">TECHNICAL WEEK</option>
                        <option value="HACKATHON/COMPETITION">
                          HACKATHON/COMPETITION
                        </option>
                        <option value="DISTINGUISHED LECTURE">
                          DISTINGUISHED LECTURE
                        </option>
                        <option value="OTHERS">OTHERS</option>
                      </select>
                    ) : (
                      <span className="break-all">{"  "+event.description}</span>
                    )}
                  </div>
                </div>

                {/* Event Details */}
                <div className="mt-3 bg-gray-50 border rounded-lg p-3">
                  <span className="font-semibold text-sm text-gray-700">
                    Event Details
                  </span>

                  {editId === event._id && editformdata ? (
                    <textarea
                      onChange={handlechange}
                      className="mt-2 text-sm text-gray-600 border-white w-full h-30 inputbox2 p-2"
                      name="details"
                      value={editformdata.details}
                      placeholder="Complete event details..."
                    ></textarea>
                  ) : (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-4">
                      {event.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Geteventdata;

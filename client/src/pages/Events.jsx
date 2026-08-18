import React, { useEffect, useState } from "react";
import orangebg3 from "../assets/designs/orangebg3.png";
import EventBanner from "../components/EventBanner.jsx";
import Eventdetails from "../components/Eventdetails.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Events() {
  const location = useLocation();
  const [eventList, seteventList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }

    const fetchevents = async () => {
      try {
        const result = await axios.get(
          "https://ieee-ies-iem.onrender.com/eventapi/getallevents",
        );
        seteventList(result.data.data.reverse());
      } catch (error) {
        console.error("Error Fetching data", error);
      }
    };
    fetchevents();
  }, [location]);

  const completedEvents = eventList.filter(
    (event) => event.status?.toLowerCase() === "completed",
  );

  const upcomingEvents = eventList.filter(
    (event) => event.status?.toLowerCase() === "upcoming",
  );

  return (
    <div
      id="eventbanner"
      className="relative min-h-[calc(100vh-7.6rem)] flex flex-col items-center scroll-mt-[100px] lg:scroll-mt-[140px] z-[1] box-border"
    >
      <div className="relative w-full flex justify-center h-auto">
        <img
          src={orangebg3}
          className="absolute w-full h-[400px] z-[0] object-cover"
          alt=""
        />
        <EventBanner />
      </div>

      <div
        id="view"
        className="scroll-mt-[108px] lg:scroll-mt-[140px] w-full bg-gradient-to-b from-slate-50/80 to-white px-[5%] py-12 sm:py-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="heading">Events & Activity Highlights</p>
            <p className="subheading mt-3 max-w-xl mx-auto">
              Explore our diverse range of events and activities
            </p>
            <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-400" />
            <br />
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8">
              <div
                onClick={() => setActiveFilter("all")}
                tabIndex={0}
                className={`px-3 py-1.5 rounded-full font-semibold cursor-pointer
      shadow-md transition-all duration-300 hover:scale-101
      focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
      ${
        activeFilter === "all"
          ? "bg-orange-500 text-white"
          : "bg-orange-100 text-orange-600 border border-orange-300 hover:bg-orange-500 hover:text-white"
      }`}
              >
                ALL
              </div>

              <div
                onClick={() => setActiveFilter("upcoming")}
                tabIndex={0}
                className={`px-3 py-1.5 rounded-full font-semibold cursor-pointer
      shadow-md transition-all duration-300 hover:scale-101
      focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
      ${
        activeFilter === "upcoming"
          ? "bg-orange-500 text-white"
          : "bg-orange-100 text-orange-600 border border-orange-300 hover:bg-orange-500 hover:text-white"
      }`}
              >
                UPCOMING
              </div>

              <div
                onClick={() => setActiveFilter("completed")}
                tabIndex={0}
                className={`px-3 py-1.5 rounded-full font-semibold cursor-pointer
      shadow-md transition-all duration-300 hover:scale-101
      focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
      ${
        activeFilter === "completed"
          ? "bg-orange-500 text-white"
          : "bg-orange-100 text-orange-600 border border-orange-300 hover:bg-orange-500 hover:text-white"
      }`}
              >
                COMPLETED
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {eventList.map((event, index) => (
              <Eventdetails
                key={index}
                poster={event.poster}
                name={event.name}
                description={event.description}
                venue={event.venue}
                eventdate={event.eventdate}
                gallery={event.gallery}
                details={event.details}
                link={event.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;

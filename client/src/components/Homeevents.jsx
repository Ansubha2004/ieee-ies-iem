import React, { useState, useEffect } from "react";
import aarambh1 from "../assets/upcomingevents/aarambh1.0.jpg"
import evmodellinglecture from "../assets/upcomingevents/EVmodellinglecture.jpeg"
import Button from "../components/Button.jsx";
import Events from "../data/events.json";

function Homeevents() {

    const eventposter = [aarambh1, evmodellinglecture];

    const [Index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prev) => (prev + 1) % eventposter.length);
        }, 10000);

        return () => clearInterval(intervalId); // Cleanup to avoid memory leak
    }, [eventposter.length]);



    return (
        <div className="w-full flex sm:flex-row flex-col-reverse justify-around">
            <div
                id="recents"
                className="w-full sm:w-4/7 flex flex-col items-center sm:items-start justify-between rounded-[10px] "
            >
                <br className="sm:hidden" />
                <p className="subheading  text-[1.5rem] mb-[24px]">
                    Event Schedules
                </p>
                <div className="flex flex-col w-full items-start gap-7 ">
                    {Events.map((event, index) => (
                        <div key={index}>
                            <a className="text-blue-800 font-[700] hover:underline" href={event.link}>{event.name}</a>
                            <div className="paratext  w-full flex text-[0.8rem] gap-1">
                                <p>{event.date}</p>
                                <p>|</p>
                                <p>{event.venue}</p>
                                <p>|</p>
                                <p>{event.Description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Button themecss="btn1 mt-[40px]" Content="Explore More Events" />
            </div>
            <div
                id="upcoming"
                className="w-full sm:w-3/7 flex flex-col items-center border-solid border-[2px] border-amber-600 h-fit"
            >
                <div className="w-full text-center bg-amber-600 p-2 text-white font-bold text-[1.3rem]">
                    Upcoming Event
                </div>
                <img src={eventposter[Index]} className="w-full aspect-[16/11]  p-[3%]" />
                <a href="" className="w-full  mb-5 text-center font-bold text-blue-800 linkanimate">View Event</a>
            </div>
        </div>
    );
}

export default Homeevents;
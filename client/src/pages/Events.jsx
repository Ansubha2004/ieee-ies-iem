import React from 'react'
import orangebg3 from "../assets/designs/orangebg3.png"
import EventBanner from '../components/EventBanner.jsx';
import Eventdetails from '../components/Eventdetails.jsx';
import events from "../data/events.json";
import eventimages from '../utils/eventposter.jsx';


function Events() {
  return (
    <div id="eventbanner"  className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center  z-[1]  box-border  ">
      <div className="relative w-full flex justify-center   h-auto">
        <img src={orangebg3} className="absolute w-full h-[400px] z-[0]" alt="" />
        <EventBanner />
      </div>
      
      <div id="view" className="scroll-mt-[108px] lg:scroll-mt-[140px] px-[5%] py-[20px] sm:py-[40px]">
        <p className="heading text-center">Events & Activity Highlights</p>
        <p className="subheading text-center">Explore our diverse range of events and activities</p>
        <br className="hidden sm:block"/>
        <div className="w-full  flex flex-wrap justify-evenly space-y-10 mt-5">
          {events.slice(0,events.length-1).reverse().map((event, index) => (
            <Eventdetails
              key={index}
              image={eventimages[index+1]}
              name={event.name}
              description={event.Description}
              venue={event.venue}
              date={event.date}
              gallery={event.gallery}
              details={event.details}
              link={event.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events
import React from 'react'
import orangebg3 from "../assets/designs/orangebg3.png"
import EventBanner from '../components/EventBanner.jsx';
import Eventdetails from '../components/Eventdetails.jsx';
import events from "../data/events.json";
import eventimages from '../utils/eventposter.jsx';


function Events() {
  return (
    <div className="relative  min-h-[calc(100vh-7.6rem)] flex flex-col items-center  z-[1] box-border  ">
      <div className="relative w-full flex justify-center   h-auto">
        <img src={orangebg3} className="absolute w-full h-[400px] z-[0]" alt="" />
        <EventBanner />
      </div>
      <div id="view" className="scroll-mt-[108px] lg:scroll-mt-[140px] px-[5%] pt-[20px] sm:pt-[40px]">
        
        <div className="w-full h-auto px-[5%] py-[20px] sm:py-[30px] flex sm:flex-row-reverse flex-col-reverse sm:gap-0 gap-7 ">
          <img
            src={eventimages[0]}
            alt=""
            className="sm:w-[55%] object-top w-full "
          />
          <div className="w-full flex flex-col items-center sm:block sm:w-1/2 h-auto sm:pl-[3%]">
            <p className="heading">Upcoming IEEE Event</p>
            <p className="subheading ">
              Hype yourself for the next mega IEEE event
            </p>
            <br />

          </div>
        </div>
      </div>
      <div className="scroll-mt-[108px] lg:scroll-mt-[140px] px-[5%] py-[20px] sm:py-[40px]">
        <p className="heading text-center">Events & Activity Highlights</p>
        <p className="subheading text-center">Explore our diverse range of events and activities</p>
        <br />
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
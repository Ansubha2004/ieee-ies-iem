import React, { useState, useEffect } from "react";
import homebackground from "../assets/images/homebackground.png";
import ieeeieslogo2 from "../assets/images/ieeeieslogo2.png";
import iemlogo from "../assets/images/iemlogo.png";
import Button from "./Button.jsx";
import clsx from "clsx"

function Homebanner() {
  
  const quotes = [
    "IEEE is the world's largest technical professional organization dedicated to advancing technology",
    "At IEEE IES SBC, we turn knowledge into action and technology into impact.",
    "Join IEEE IES SBC — connect, innovate, and shape the future of industrial electronics.",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Change quote every 3 seconds
  }, [quotes.length]);
  return (
    <div
      id="banner"
      className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] object-cover  overflow-hidden flex justify-center items-center"
    >
      <img
        src={homebackground}
        className="absolute h-full w-full z-[0] object-cover  "
      />
      <div className="relative z-[1] w-full h-full bg-black/50 flex flex-col justify-evenly items-center box-border px-[3%] py-[3%]">
        <div className="hero-title whitespace-nowrap text-xl sm:text-2xl md:text-3xl lg:text-5xl">
          <p className="textshadow text-sm sm:text-lg md:text-xl font-medium text-orange-100/90">Welcome to IEEE</p>
          <p className="textshadow">Industrial Electronics Society</p>
          <p className="textshadow text-xs sm:text-sm md:text-base font-semibold text-yellow-50/95 mt-1">
            Student's Branch Chapter | EE & EEE | IEM, Kolkata
          </p>
        </div>
        <div
          id="logo"
          className="w-full flex justify-center items-center scale-[0.8]"
        >
          <img src={ieeeieslogo2} className="h-[2.8rem]" />
        </div>
        <p className="hero-quote w-[85%] sm:w-[75%] max-w-2xl text-sm sm:text-base">
          {quotes[currentIndex]}
        </p>
        <Button
          themecss="btn2 whitespace-nowrap sm:text-[1rem] text-[0.9rem] px-[8%] textshadow"
          click={() => {
            const section = document.getElementById("view");
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block:"start" });
            }
          }}
          Content="Get Insights"
        />
      </div>
    </div>
  );
}

export default Homebanner;

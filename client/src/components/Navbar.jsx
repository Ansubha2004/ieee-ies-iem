
import React from "react";
import ieeelogo from "../assets/images/ieeelogo.png";

function Navbar() {
  return (
    
      <nav id="nav1" className="Navbar relative bg-[#0A192F] text-white">
        <div className="flex justify-between outline-none items-center text-[0.65rem] sm:text-xs gap-1 sm:gap-[1vw] font-medium tracking-wide">
          <a href="https://www.ieee.org/">ieee.org</a>
          <p>|</p> 
          <a href="https://ieeexplore.ieee.org/Xplore/home.jsp">
            IEEE Xplore Digital Library{" "}
          </a>
          <p>|</p>
          <a target="main" href="https://standards.ieee.org/">
            IEEE Standards{" "}
          </a>
          <p>|</p>
          <a href="https://www.ieee.org/sitemap.html">More Websites</a>
        </div>
        <img
          src={ieeelogo}
          className="object-contain h-[1.2rem] sm:h-[1.7rem] my-3 sm:my-1"
        />
      </nav>
      
    
  );
}

export default Navbar;

import React from "react";

function Footer() {
  return (
    <footer className="relative  bg-[#0A192F] w-full h-auto box-border py-2 px-[4%] sm:px-[8%] text-[white] text-[0.6rem] ">
      <div className="gap-[1rem] hidden sm:flex mb-2">
        <a href="https://www.ieee.org/">IEEE Home</a>
        <p>|</p>
        <a href="/Contact">Contact & Support</a>
        <p>|</p>
        <a href="https://www.ieee.org/accessibility-statement">Accessibility</a>
        <p>|</p>
        <a href="https://www.ieee.org/about/corporate/governance/p9-26">Nondiscrimination Policy</a>
        <p>|</p>
        <a href="https://secure.ethicspoint.com/domain/media/en/gui/20410/index.html">IEEE Ethics Reporting</a>
        <p>|</p>
        <a href="https://www.ieee.org/about/help/site-terms-conditions">Terms and Conditions </a>
        <p>|</p>
        <a href="https://privacy.ieee.org/policies">IEEE Privacy Policy</a>
        <p>|</p>
        <a href="/Contact">Feedback</a>
      </div>
      <p className="sm:text-left text-center sm:font-[100]">
        © Copyright 2025 IEM IEEE IES Student Chapter – All rights reserved. Use
        of this website signifies your agreement to the{" "}
        <a
          className="font-[500]"
          href="https://www.ieee.org/about/help/site-terms-conditions"
        >
          IEEE Terms & Disclosures
        </a>
        .<br />
        As a student branch chapter under the world’s largest technical
        professional organization, IEEE, we are committed to advancing
        technology for the benefit of humanity through innovation,
        collaboration, and knowledge sharing. <br />
        <br />
        This site is created, maintained, and managed by the IEM IEEE IES
        Student Chapter.
        <br /> Please feel free to{" "}
        <a href="/Contact" className="font-[500]">
          contact us
        </a>{" "}
        for any assistance or inquiries.
      </p>
    </footer>
  );
}

export default Footer;
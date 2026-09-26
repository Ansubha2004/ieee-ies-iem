import React from "react";
import Gallery from "../components/Gallerycard.jsx";

function dashboardanalytics() {
  return (
    <section  className="mt-15 p-5 pb-10 min-h-0">
      <div className="w-full flex gap-10 justify-between items-start">
        <div className="flex-1">
          <p className="heading  oswald">Dashboard Analytics</p>
          <p className="paratext">
          A centralized overview of chapter activities and performance.
          </p>
        </div>
      </div>
      <br />
      <Gallery/>
    </section>
  );
}

export default dashboardanalytics;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Homegallery() {
  const [gallery, setGallery] = useState([]);

  const url =
    import.meta.env.VITE_API_URL ||
    "https://ieee-ies-iem.onrender.com";

  useEffect(() => {
    const fetchimages = async () => {
      try {
        const response = await axios.get(
          `${url}/galleryapi/getimage`
        );

        const { success, data } = response.data;

        if (success) {
          setGallery(data);
        }
      } catch (err) {
        console.log("API error in gallery");
      }
    };

    fetchimages();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[30px] px-4">

      {gallery.map((image) => (
        <div
          key={image.imageid}
          className="relative w-full aspect-[16/10] border-4 border-amber-600 rounded-xl p-2 bg-amber-500 shadow-md overflow-hidden"
        >
          <img
            id={image.imageid}
            src={image.galleryimage}
            className="h-full w-full object-cover rounded-lg"
            alt="IEEE IES Gallery"
          />
        </div>
      ))}

    </div>
  );
}

export default Homegallery;
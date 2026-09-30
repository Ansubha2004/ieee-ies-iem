import React, { useEffect, useState } from "react";
import { Video, Plus, Upload } from "lucide-react";
import axios from "axios";
import {
  successmessage,
  errormessage,
} from "../util/notification";

function Videos() {
  const [video, setVideo] = useState(null);

  const url =
    import.meta.env.VITE_API_URL ||
    "https://ieee-ies-iem.onrender.com";

  // Fetch existing video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${url}/videoapi/getvideo`
        );

        if (response.data.success) {
          setVideo(response.data.data);
        } else {
          setVideo(null);
        }
      } catch (error) {
        console.error("Video fetch error:", error);
        errormessage("Failed to fetch video");
      }
    };

    fetchVideo();
  }, [url]);


  // Add / Replace video
  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("video", file);

      const response = await axios.put(
        `${url}/videoapi/editvideo`,
        formData
      );

      const {
        success,
        message,
        data,
      } = response.data;

      if (success) {
        setVideo(data);

        successmessage(
          message || "Video uploaded successfully"
        );
      } else {
        errormessage(
          message || "Video upload failed"
        );
      }

    } catch (error) {
      console.error("Upload error:", error);

      errormessage(
        "Failed to upload video"
      );
    }

    // Allows selecting the same file again
    e.target.value = "";
  };


  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Video size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Featured Video
            </h2>

            <p className="text-xs text-slate-500">
              Manage the featured IEEE IES video
            </p>
          </div>

        </div>


        {/* Add button when there is no video */}
        {!video && (
          <label>

            <input
              type="file"
              accept="video/*"
              onChange={handleChange}
              className="hidden"
            />

            <div className="flex cursor-pointer items-center gap-1.5 rounded-md bg-orange-500 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-orange-600">

              <Plus size={16} />

              Add Video

            </div>

          </label>
        )}

      </div>


      {/* Content */}
      <div className="p-5">

        {video ? (

          /* Video exists */
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">

            {/* Video player */}
            <div className="relative aspect-video bg-black">

              <video
                src={video.video}
                controls
                preload="metadata"
                className="h-full w-full object-contain"
              />

            </div>


            {/* Bottom action */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3">

              <div>
                <p className="text-sm font-medium text-slate-700">
                  Featured Video
                </p>

                <p className="text-xs text-slate-400">
                  Replacing the video will remove the previous one
                </p>
              </div>


              {/* Replace button */}
              <label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">

                  <Upload size={15} />

                  Replace

                </div>

              </label>

            </div>

          </div>

        ) : (

          /* No video */
          <div className="flex h-52 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">

            <Video
              size={32}
              className="mb-3 text-slate-300"
            />

            <p className="text-sm font-medium text-slate-500">
              No featured video
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Upload one video to display it here
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default Videos;
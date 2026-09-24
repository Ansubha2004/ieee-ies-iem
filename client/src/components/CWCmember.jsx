import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";

function CWCmember({
  name,
  position,
  description,
  image,
  linkedin,
  mail,
}) {
  return (
    <div
      className="
        w-full h-full
        flex flex-col
        overflow-hidden
        rounded-2xl
        border border-amber-100/70
        bg-gradient-to-br from-amber-50 via-white to-amber-100
        shadow-md shadow-slate-200/80
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg hover:shadow-slate-300/60
      "
    >
      {/* Image Section */}
      <div
        className="
          relative w-full
          aspect-[4/3]
          sm:aspect-[4/3]
          md:aspect-[5/4]
          lg:aspect-[4/3]
          overflow-hidden
          bg-amber-100
        "
      >
        <img
          src={image}
          alt={name}
          className="
            w-full h-full
            object-cover
            transition-transform duration-500
            hover:scale-[1.02]
          "
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 w-full px-4 sm:px-5 py-4">
        
        {/* Name + Social Links */}
        <div className="flex items-start justify-between gap-3">
          
          <div className="min-w-0">
            <p className="member-name leading-tight">
              {name}
            </p>

            <div
              className="
                flex flex-wrap
                items-center
                gap-1.5
                mt-1
                text-xs sm:text-sm
                font-medium
              "
            >
              <span className="text-slate-700 font-semibold">
                Role:
              </span>

              <span className="text-blue-800">
                {position}
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex items-center justify-center
                  w-8 h-8 sm:w-9 sm:h-9
                  rounded-full
                  bg-white/80
                  border border-blue-100
                  text-blue-600
                  transition-all duration-200
                  hover:bg-blue-600
                  hover:text-white
                  active:scale-95
                "
              >
                <FaLinkedin size={17} />
              </a>
            )}

            {mail && (
              <a
                href={`mailto:${mail}`}
                aria-label="Email"
                className="
                  flex items-center justify-center
                  w-8 h-8 sm:w-9 sm:h-9
                  rounded-full
                  bg-white/80
                  border border-red-100
                  text-red-700
                  transition-all duration-200
                  hover:bg-red-700
                  hover:text-white
                  active:scale-95
                "
              >
                <IoMdMailUnread size={19} />
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-amber-200/60 my-3" />

        {/* Description */}
        <p
          className="
            paratext
            text-sm
            leading-[1.55]
            text-slate-600
            text-left
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default CWCmember;
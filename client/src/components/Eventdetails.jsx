import React from 'react'
import Button from "../components/Button.jsx";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineTag } from "react-icons/hi";

function Eventdetails({poster, name, description, venue, eventdate, gallery, details, link }) {
    const handleGalleryClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (gallery) window.open(gallery, "_blank");
    };

    return (
        <article className="group w-full flex flex-col overflow-hidden rounded-xl bg-white border border-slate-200/80 shadow-sm shadow-slate-200/60 hover:shadow-lg hover:shadow-slate-300/40 hover:-translate-y-0.5 transition-all duration-300">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-1">
                <div className="relative overflow-hidden">
                    <img
                        src={poster}
                        alt={name}
                        className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-600/95 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide uppercase shadow-sm">
                        <HiOutlineTag className="text-xs" />
                        {description}
                    </span>
                </div>

                <div className="flex flex-col flex-1 px-3.5 py-3 gap-2">
                    <h3 className="font-display font-semibold text-sm text-slate-900 leading-snug tracking-tight line-clamp-2 group-hover:text-amber-800 transition-colors duration-200">
                        {name}
                    </h3>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] sm:text-xs">
                            <HiOutlineCalendar className="text-amber-600 shrink-0 text-sm" />
                            <span className="font-medium truncate">{eventdate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] sm:text-xs">
                            <HiOutlineLocationMarker className="text-amber-600 shrink-0 text-sm" />
                            <span className="font-medium truncate">{venue}</span>
                        </div>
                    </div>

                    <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed line-clamp-2">{details}</p>
                </div>
            </a>

            {gallery && (
                <div className="px-3.5 pb-3 pt-0 border-t border-slate-100 mx-3.5 mb-3">
                    <Button
                        themecss="btn3 w-full text-xs py-1.5 mt-2.5"
                        click={handleGalleryClick}
                        Content="View Gallery"
                    />
                </div>
            )}
        </article>
    )
}

export default Eventdetails

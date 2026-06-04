import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function EventBanner() {
    return (
        <div id="eventbanner" className="relative z-[2] bg-black/20 h-[400px] flex flex-col items-center justify-center gap-10 sm:gap-7 lg:gap-5 w-full ">
            <p className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight text-white/95">IEEE IAS IEM - A Events & Programs Hub</p>
            <p className="w-[90%] max-w-3xl text-sm sm:text-base text-center text-white/85 leading-relaxed">Explore a diverse range of technical workshops, innovation-driven competitions, expert talks, and student-led initiatives organized by the IEEE Industrial Electronics Society – IEM Student Chapter. Our events aim to bridge the gap between academia and industry, ignite curiosity, and empower the next generation of engineers and innovators.
            </p>
            <Button
                themecss="py-3 btn2"
                click={() => {
                    const section = document.getElementById("view");
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }}
                Content="Explore the Events"
            />
        </div>
    )
}

export default EventBanner
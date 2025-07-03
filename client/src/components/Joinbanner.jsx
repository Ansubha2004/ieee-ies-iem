import React from 'react'
import Button from "../components/Button.jsx"

function Joinbanner() {
    return (
        <div className="relative z-[2] bg-black/20 h-[400px] flex flex-col items-center justify-evenly w-full sm:w-[80%] lg:w-[50%]">
            <p className="font-[500] text-[1.7rem] sm:text-[2rem] text-white/90">Ready to Join IEEE IES ?</p>
            <p className="w-[90%] text-[1rem] md:text-[0.8rem] text-center text-white/80">If you've explored what we do and are excited to be a part of it — we're glad you're here.
Whether you have questions or you're ready to take the next step, just fill out the contact form or reach out to us directly.
Interested in joining the IEEE IES Student Branch Chapter at IEM? Let us know — we'd love to have you onboard.
Our team will get back to you with everything you need to get started.
Let’s innovate together.
            </p>
            <Button Content="Explore Membership" themecss="btn2 py-3"/>
        </div>
    )
}

export default Joinbanner
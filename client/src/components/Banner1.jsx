import React from 'react'
import Button from '../components/Button.jsx'

function Banner1() {
  return (
    
      <div className="w-full bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-700 px-[5%] my-[5%] sm:my-[2%] py-5 bg-black flex justify-around items-center ">
        <p className="banner-text">Not an IEEE Member? <br className="sm:hidden"/> Join today to explore the Community </p>
        <Button themecss="btn2 sm:py-[1%] whitespace-nowrap textshadow1" click={()=>(window.open("https://www.ieee.org/membership/join","_blank"))} Content="Join Now" />
      </div>
    
  )
}

export default Banner1
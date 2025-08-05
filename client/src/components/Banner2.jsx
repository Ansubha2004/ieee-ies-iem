import React from 'react'
import Button from '../components/Button.jsx'

function Banner2() {
  return (
    
      <div className="w-full bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-700 px-[5%] my-[5%] sm:my-[2%] py-5 bg-black flex justify-around items-center ">
        <p className="text-white sm:text-[1rem] lg:text-[1.3rem] textshadow1 text-[0.8rem] font-bold">Ignite Innovation with IEEE IES - IEM Kolkata </p>
        <Button themecss="btn2 sm:py-[1%] whitespace-nowrap textshadow1" click={()=>(window.open("https://forms.gle/Z9jAjDcjha463atS8","_blank"))} Content="Click the Form" />
      </div>
    
  )
}

export default Banner2
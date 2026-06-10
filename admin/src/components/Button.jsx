import React from 'react'
import clsx from "clsx"


function Button({themecss,click,submit,icon,iconcss,Content,type}) {
  return (
    <button type={type} onClick={click} onSubmit={submit} className={clsx("flex items-center gap-2",themecss)}>
        
        {icon}
        <a>{Content}</a>
    </button>
  )
}

export const Switchslider = ({ checked, click }) => (
	<button
      type="button"
      onClick={click}
      className={clsx(
        "relative h-[25px] w-[42px] rounded-full transition-all duration-200 cursor-pointer border-[2px]",
        checked
          ? "bg-blue-600 border-blue-600"
          : "bg-blue-50 border-black/10"
      )}
    >
      <span
        className={clsx(
          "absolute top-0.5 h-[17px] w-[17px] rounded-full bg-white transition-all duration-200",
          checked ? "left-[20px]" : "left-[2px]"
        )}
      />
    </button>
  );


export default Button
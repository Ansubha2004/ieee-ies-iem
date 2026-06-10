import React from 'react'
import clsx from "clsx"
import * as Switch from "@radix-ui/react-switch";

function Button({themecss,click,submit,icon,iconcss,Content,type}) {
  return (
    <button type={type} onClick={click} onSubmit={submit} className={clsx("flex items-center gap-2",themecss)}>
        
        {icon}
        <a>{Content}</a>
    </button>
  )
}

export const Switchslider = ({click}) => (
	<form onClick={click} >
		<div className="flex items-center">
			<Switch.Root
				className="relative h-[25px] w-[42px] cursor-default rounded-full bg-blue-50 border-black/10 border-[2px]  outline-none data-[state=checked]:bg-blue-600"
				
			>
				<Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
			</Switch.Root>
		</div>
	</form>
);



export default Button
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

export default Button
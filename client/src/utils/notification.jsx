import {toast} from "react-toastify"

export const successmessage=(message)=>{
    toast.success(message,{
        postion:"top-center"
    })
}

export const errormessage=(message)=>{
    toast.error(message,{
        postion:"top-center"
    })
}
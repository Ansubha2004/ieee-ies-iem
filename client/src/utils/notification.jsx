import {toast} from "react-toastify"

export const successmessage=(message)=>{
    toast.success(message,{
        position:"bottom-right",
        autoClose: 3000,
    })
}

export const errormessage=(message)=>{
    toast.error(message,{
        position:"bottom-right",
        autoClose: 3000,
    })
}
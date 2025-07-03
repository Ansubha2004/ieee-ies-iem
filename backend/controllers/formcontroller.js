import SendMail from "../utils/mailer.js"

export const formdatasubmission=(req,res)=>{
    try{
        const {name,email,message}=req.body;
        if(!name || !email || !message)
        {
            return res.json({success:false,message:"Empty credentials..."});
        }
        SendMail(name,email,message);
        return res.json({success:true,message:"Form submitted successfully",data:{name,email,message}})
    }
    catch(err){
        return res.json({sucess:false,message:"Error while from submission"});
    }

}
import cwcmodel from "../models/cwcmodel.js";
import cloudinary from "../config/cloudinary.js";

export const addcwc=async(req,res)=>{
    try{
        const {id,name,role,description,socialmedia}=req.body;
        if(!name || !id || !role || !description || !socialmedia)
            return res.json({
                success:false,
                message:"Fill the cwc details"
        })
        if(!req.file)
        {
            return res.status(400).json({
                success:false,
                message:"Image not uploaded"
            })
        }
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result=await cloudinary.uploader.upload(base64Image,{
            folder:"cwc_member"
        });

        

        const createcwc=await cwcmodel.create({
            id,
            name,
            role,
            image:result.secure_url,
            description,
            socialmedia:JSON.parse(socialmedia)
        });
        return res.json({
            success:true,
            message:"All details uploaded successfully",
            data:createcwc
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Error adding CWC data to db",
            error:error.message
        })
    }
}

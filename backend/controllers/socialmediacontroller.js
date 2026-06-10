import socialmediamodel from "../models/socialmediamodel.js";

export const getsocials = async (req, res) => {
    try {
        const socials=await socialmediamodel.findOne();
        const enableddata=Object.entries(socials.toObject()).filter(([key,value])=>value?.enabled) //enabled social data links
        return res.json({
            success:true,
            message:"Fetched all enabled urls ",
            enableddata
        })
    }
    catch (error) {
        return res.json({
            success: true,
            message: "Error fetching social media data from API",
            error
        })
    }
}


export const updatesocials = async (req, res) => {
    try {
        const {linkedin,instagram,facebook,youtube,x}=req.body;
        return res.json({message:[linkedin,instagram,facebook,youtube,x]})
    }
    catch (error) {
        return res.json({
            success: true,
            message: "Error updating social media data from API",
            error
        })
    }
}

import videomodel from "../models/videomodel.js"
import cloudinary from "../config/cloudinary.js";

export const editvideo = async (req, res) => {
    try {

    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error editing video",
            error: error.message
        })
    }
}

export const getvideo = async (req, res) => {
    try {
        const getvideo = await videomodel.findOne();
        if (!getvideo)
            return res.json({
                success: false,
                message: "Cant find video to display"
            })
        return res.json({
            success:true,
            message:"Displaying video",
            video:getvideo
        })
    }
    catch (error) {
        return res.json({
            success: false,
            message: "API Error getting video",
            error: error.message
        })
    }
}
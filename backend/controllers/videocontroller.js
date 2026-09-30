import videomodel from "../models/videomodel.js"
import cloudinary from "../config/cloudinary.js";

export const editvideo = async (req, res) => {
    try {
        const videofile = req.file;
        if (!videofile) {
            return res.json({
                success: false,
                message: "Video not uploaded"
            })
        }

        const checkvideo = await videomodel.findOne();
        // Convert uploaded video to base64
        const base64Video =
            `data:${videofile.mimetype};base64,${videofile.buffer.toString("base64")}`;


        // Upload new video to Cloudinary
        const uploadvideo = await cloudinary.uploader.upload(
            base64Video,
            {
                folder: "video_folder",
                resource_type: "video"
            }
        );

        if (!checkvideo) {
            const upload = await videomodel.create({
                video: uploadvideo.secure_url,
                videoid: uploadvideo.public_id
            });
        }
        else {
            if (checkvideo.videoid) {
                await cloudinary.uploader.destroy(checkvideo.videoid, {
                    resource_type: "video"
                })
            }
             checkvideo.video = uploadvideo.secure_url;
            checkvideo.videoid = uploadvideo.public_id;

            await video.save();

        }
        return res.json({
            success: true,
            message: "Video uploaded successfully",
            data:checkvideo
        });

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
            success: true,
            message: "Displaying video",
            data: getvideo
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
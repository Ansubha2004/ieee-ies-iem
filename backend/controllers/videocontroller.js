import videomodel from "../models/videomodel.js";
import cloudinary from "../config/cloudinary.js";


export const editvideo = async (req, res) => {
    try {

        const videofile = req.file;

        if (!videofile) {
            return res.json({
                success: false,
                message: "Video not uploaded"
            });
        }


        // Check if video already exists
        const checkvideo = await videomodel.findOne();


        // Convert video to base64
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


        let videoData;


        // FIRST VIDEO
        if (!checkvideo) {

            videoData = await videomodel.create({
                video: uploadvideo.secure_url,
                videoid: uploadvideo.public_id
            });

        }


        // REPLACE EXISTING VIDEO
        else {

            // Delete old video from Cloudinary
            if (checkvideo.videoid) {

                const deleteResult = await cloudinary.uploader.destroy(
                    checkvideo.videoid,
                    {
                        resource_type: "video"
                    }
                );

                console.log("Old video deleted:", deleteResult);
            }


            // Update same MongoDB document
            checkvideo.video = uploadvideo.secure_url;
            checkvideo.videoid = uploadvideo.public_id;

            videoData = await checkvideo.save();
        }


        return res.json({
            success: true,
            message: "Video uploaded successfully",
            data: videoData
        });

    }
    catch (error) {

        console.error("Error editing video:", error);

        return res.status(500).json({
            success: false,
            message: "Error editing video",
            error: error.message
        });
    }
};



export const getvideo = async (req, res) => {

    try {

        const getvideo = await videomodel.findOne();

        if (!getvideo) {
            return res.json({
                success: false,
                message: "Can't find video to display"
            });
        }


        return res.json({
            success: true,
            message: "Displaying video",
            data: getvideo
        });

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "API Error getting video",
            error: error.message
        });
    }
};
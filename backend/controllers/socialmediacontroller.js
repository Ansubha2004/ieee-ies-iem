import socialmediamodel from "../models/socialmediamodel.js";

export const getsocials = async (req, res) => {
    try {
        const socials = await socialmediamodel.findOne();
        const enableddata = Object.entries(socials.toObject()).filter(([key, value]) => value?.enabled) //enabled social data links
        return res.json({
            success: true,
            message: "Fetched all enabled urls ",
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

export const getallsocials = async (req, res) => {
    try {
        const socials = await socialmediamodel.findOne();
        return res.json({
            success: true,
            message: "Fetched all urls ",
            data: socials
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
        const socials = req.body;

        const updatedSocials = await Socialmedia.findOneAndUpdate(
            {},              // find first document
            socials,         // new data
            {
                new: true,     // return updated document
                upsert: true,  // create if not exists
            }
        );

        return res.status(200).json({
            success: true,
            message: "Updated successfully the social media",
            data: updatedSocials,
        });
    }
    catch (error) {
        return res.json({
            success: true,
            message: "Error updating social media data from API",
            error
        })
    }
}

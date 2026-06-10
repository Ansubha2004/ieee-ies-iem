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

        for(const [platform,data] of Object.entries(socials))
        {
            if(data.enabled===true && (!data.url || data.url.trim()===""))
                {
                    return res.status(400).json({
                      success: false,
                      message: `${platform} URL cannot be blank when enabled`
                    });
                }
        }

       const existing=await socialmediamodel.findOne({});
       if(existing)
       {
        const update = await socialmediamodel.findOneAndUpdate({},
            socials, {
            new: true,
            runValidators: true
        }
        );
        if (!update) {
            return res.json({
                success: false,
                message: "Update socials backend failed"
            })
        }
        return res.json({
            success: true,
            message: "Socialmedia details updated",
            data: update

        })
       }
       const create = await socialmediamodel.create(socials);
        return res.status(200).json({
            success: true,
            message: "Updated successfully the social media",
            data: socials,
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error updating social media data from API",
            error
        })
    }
}

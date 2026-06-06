import contactmodel from "../models/contactmodel.js";


export const getcontact = async (req, res) => {
    try {
        const data = await contactmodel.findOne({});
        return res.json({
            success: true,
            message: "Contact details and address fetched",
            data
        })
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error fetching the chapter contact details and address",
            error: error.message,
        });
    }
}

export const updatecontact = async (req, res) => {
    try {
        const { email, institute, address, mapurl } = req.body;

        if(!email || !institute || !address || !mapurl)
        {
            return res.json({
                success: false,
                message: "Fill the contact details and address",
              });
        }


        const existing = await contactmodel.findOne({})
        if (existing) {
            const update = await contactmodel.findOneAndUpdate({},
                {
                    email,
                    institute,
                    address,
                    mapurl
                }, {
                new: true,
                runValidators: true
            }
            );
            if (!update) {
                return res.json({
                    success: false,
                    message: "Update contacts backend failed"
                })
            }
            return res.json({
                success: true,
                message: "Contact details updated",
                data: update

            })
        }


        const create = await contactmodel.create({
            email,
            institute,
            address,
            mapurl
        });
        return res.json({
            success: true,
            message: "All contact details uploaded successfully",
            data: create,
        });

    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error updating the chapter contact details and address",
            error: error.message,
        });
    }
}
import contactmodel from "../models/contactmodel.js";


export const getcontact=async (req,res)=>{
    try{
        const data=await contactmodel.findOne({});
        return res.json({
            success:true,
            message:"Contact details and address fetched",
            data
        })
    }
    catch(err)
    {
        return res.json({
            success: false,
            message: "Error fetching the chapter contact details and address",
            error: error.message,
          });
    }
}
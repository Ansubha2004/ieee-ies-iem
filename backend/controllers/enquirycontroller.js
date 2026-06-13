import enquirymodel from "../models/enquirymodel.js";
import { SendMail } from "../utils/mailer.js";


export const postenquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message)
            return res.json({
                success: false,
                message: "Not all credentials filled"
            });
        const newenquiry = await enquirymodel.create({
            name,
            email,
            subject,
            message
        })

        return res.json({
            success: true,
            message: "Successfully posted enquiry",
            data: newenquiry,
        });

    }
    catch (err) {
        return res.json({
            success: false,
            message: "Failed to post enquiry",
            err
        })
    }
}



export const getallenquiry=async (req,res)=>{
    try{
        const getdata=await enquirymodel.find()
        if(!getdata)
        {
            return res.json({
                sucess:false,
                message:"No enquiries yet"
            })
        }
        return res.json({
            success: true,
            message: "Fetched all enquiries",
            count: displayenquiries.length,
            data: getdata
        })
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Failed to get all enquiries",
            error
        })
    }
}


export const deleteenquiryspecific = async (req, res) => {
    try {
      const { id } = req.params;
      const find = await enquirymodel.findOne({ _id: id });
      if (!find) {
        return res.json({
          success: false,
          message: "Already absent from Enquiry Database",
        });
      }
      const deletespecific = await enquirymodel.deleteOne({ _id: id });
      return res.json({
        sucess: true,
        message: "Sucessfully deleted this one ",
        id,
        data:deletespecific
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Issue releted to delete this specific enquiry",
      });
    }
  };


  export const deleteenquirybystatus = async (req, res) => {
    try {
      const { status } = req.params;
      const find = await enquirymodel.find({ status });
      if (!find) {
        return res.json({
          success: false,
          message: `No ${status} status enquiries`,
        });
      }
      const deletespecificstatus = await enquirymodel.deleteMany({ status });
      return res.json({
        sucess: true,
        message: `Sucessfully deleted this ${status} status based enquiries`  ,
        count:deletespecificstatus.length,
        data:deletespecific
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Issue related to delete this specific status based enquiries",
      });
    }
  };

  export const updatestatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedEnquiry = await enquirymodel.findByIdAndUpdate(
        id,
        { status },
        { new: true } // returns updated document
      );
  
      if (!updatedEnquiry) {
        return res.json({
          success: false,
          message: "Enquiry not found",
        });
      }
  
      return res.json({
        success: true,
        message: "Status updated successfully",
        enquiry: updatedEnquiry,
      });
      
    } catch (err) {
      return res.json({
        success: false,
        message: "Error updating status",
        error: err.message,
      });
    }
  };

  
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



export const getallenquiry = async (req, res) => {
  try {
    const getdata = await enquirymodel.aggregate([
      {
        $addFields: {
          statusOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$status", "new"] }, then: 1 },
                { case: { $eq: ["$status", "in-progress"] }, then: 2 },
                { case: { $eq: ["$status", "responded"] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      },
      {
        $sort: {
          statusOrder: 1,
          date: -1,
        },
      },
    ]);
    if (!getdata) {
      return res.json({
        success: true,
        count: "0",
        message: "No enquiries yet"
      })
    }
    return res.json({
      success: true,
      message: "Fetched all enquiries",
      count: getdata.length,
      data: getdata
    })
  }
  catch (error) {
    return res.json({
      success: false,
      message: "Failed to get all enquiries",
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
      success: true,
      message: "Sucessfully deleted this one ",
      id,
      data: deletespecific
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
      success: true,
      message: `Sucessfully deleted this ${status} status based enquiries`,
      count: deletespecificstatus.length,
      data: deletespecific
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


export const searchenquiry = async (req, res) => {
  try {
    const { query } = req.query;
    const search = await enquirymodel.find({
      $or: [
        {
          name: {
            $regex: "query",
            $options: "i"
          }
        },
        {
          email: {
            $regex: "query",
            $options: "i"
          }
        }
      ]
    })
    return res.status(200).json({
      success: true,
      message:"Fetched based on search",
      data: search
    });
  }
  catch (error) {
    return res.json({
      success: false,
      message: "API error searching",
      error
    })
  }
}


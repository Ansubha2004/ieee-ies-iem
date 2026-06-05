import cwcmodel from "../models/cwcmodel.js";
import cloudinary from "../config/cloudinary.js";

export const addcwc = async (req, res) => {
  try {
    const { id, name, role, description, socialmedia } = req.body;
    if (!name || !id || !role || !description || !socialmedia) {
      return res.json({
        success: false,
        message: "Fill the cwc details",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image not uploaded",
      });
    }
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "cwc_member",
    });

    const createcwc = await cwcmodel.create({
      id,
      name,
      role,
      image: result.secure_url,
      imageid:result.public_id,
      description,
      socialmedia: JSON.parse(socialmedia),
    });
    return res.json({
      success: true,
      message: "All details uploaded successfully",
      data: createcwc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding CWC data to db",
      error: error.message,
    });
  }
};

export const getallcwcs = async (req, res) => {
  try {
    const allcwcs = await cwcmodel.find().sort({ id: 1 });
    return res.json({
      success: true,
      message: "All CWC data fetched successfully",
      data: allcwcs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error fetching all cwc details",
      error: error.message,
    });
  }
};

export const updatecwc = async (req, res) => {
  try {
    const { id: mongoId } = req.params;
    const { id, name, role, description, socialmedia } = req.body;

    if (!name || !role || !description || !socialmedia) {
      return res.json({
        success: false,
        message: "Name, role, description, and social links are required",
      });
    }

    const update = {
      id: Number(id),
      name,
      role,
      description,
      socialmedia: JSON.parse(socialmedia),
    };

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "cwc_member",
      });
      update.image = result.secure_url;
    }

    const updated = await cwcmodel.findByIdAndUpdate(mongoId, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.json({ success: false, message: "Member not found" });
    }

    return res.json({
      success: true,
      message: "Member updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating CWC member",
      error: error.message,
    });
  }
};

export const deletecwc = async (req, res) => {
  try {
    const { id: mongoId } = req.params;

    const deleteimage=await cwcmodel.findById(mongoId);

    if(!deleteimage)
    {
      return res.json({
        success:false,
        message:"Member not found"
      })
    }

    if (deleteimage.imageid) {
      await cloudinary.uploader.destroy(
        deleteimage.imageid
      );
    }


    const deleted = await cwcmodel.findByIdAndDelete(mongoId);
    if (!deleted) {
      return res.json({ success: false, message: "Member not found" });
    }
    return res.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting CWC member",
      error: error.message,
    });
  }
};

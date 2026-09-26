import gallerymodel from "../models/gallerymodel.js";
import cloudinary from "../config/cloudinary.js";

export const addimage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image not uploaded",
            });
        }
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "gallery_folder",
        });

        const count = await gallerymodel.countDocuments();
        const uploadimage=await gallerymodel.create({
            id:count+1,
            galleryimage:result.secure_url,
            imageid:result.public_id
        });
        return res.json({
            success: true,
            message: "Gallery image uploaded successfully",
            data: uploadimage
          });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding gallery image",
            error: error.message
        })
    }

}


export const getimage=async (req,res)=>{
    try{
        const galleryimages = await gallerymodel.find().sort({ id: 1 });
        return res.json({
          success: true,
          message: "All gallery images fetched successfully",
          data: galleryimages,
        });
    }
    catch(error)
    {
        res.json({
            success:false,
            message:"Error fetching gallery images",
            error:error.message
        })
    }
}

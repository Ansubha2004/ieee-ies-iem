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

        const lastImage = await gallerymodel
    .findOne()
    .sort({ id: -1 });

const newId = lastImage ? lastImage.id + 1 : 1;
        const uploadimage=await gallerymodel.create({
            id:newId,
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
        const galleryimages = (await gallerymodel.find().sort({ id: 1 })).reverse();
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



export const deleteimage = async (req,res)=>{
    try
    {
        const {id}=req.params;
        const deleteimg=await gallerymodel.findOne({ id: Number(id)});

        if(!deleteimg){
            return res.json({
                success:false,
                message:"Image already doesnt exist"
            })
        }

        if(deleteimg.imageid)
        {
            await cloudinary.uploader.destroy(deleteimg.imageid);
        }

        const deleteimage = await gallerymodel.findOneAndDelete({id:Number(id)});
        if (!deleteimage) {
            return res.json({ success: false, message: "Cant delete image as it doesnt exists" });
          }
      
          return res.json({
            success: true,
            message: "Gallery image deleted successfully",
          });


    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Failed to delete image",
            error:error.message
        })
    }
} 
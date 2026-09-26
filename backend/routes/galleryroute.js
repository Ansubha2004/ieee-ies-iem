import express from "express";
import upload from "../middlewares/uploadimage.js";
import {addimage,getimage,deleteimage} from "../controllers/gallerycontroller.js";


const router=express.Router();


router.post("/addimage",upload.single("galleryimage"),addimage);
router.get("/getimage",getimage);
router.delete("/deleteimage/:id",deleteimage);


export default router;
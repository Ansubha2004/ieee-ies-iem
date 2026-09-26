import express from "express";
import upload from "../middlewares/uploadimage.js";
import {addimage,getimage} from "../controllers/gallerycontroller.js";


const router=express.Router();


router.post("/addimage",upload.single("galleryimage"),addimage);
router.get("/getimage",getimage);

export default router;
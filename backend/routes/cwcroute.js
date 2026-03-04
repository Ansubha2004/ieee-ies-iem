import express from "express";
import { addcwc,getallcwcs } from "../controllers/cwccontroller.js";
import upload from "../middlewares/uploadimage.js"

const router=express.Router();

router.post("/addcwc",upload.single("image"),addcwc);
router.get("/getallcwc",getallcwcs);


export default router;
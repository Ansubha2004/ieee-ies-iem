import express from "express";
import uploadvideo from "../middlewares/uploadvideo.js";
import {editvideo,getvideo} from "../controllers/videocontroller.js";


const router = express.Router();

router.put("/editvideo",uploadvideo.single("video"),editvideo);
router.get("/getvideo",getvideo);



export default router;

import express from "express";
import {getsocials,getallsocials,updatesocials} from "../controllers/socialmediacontroller.js"



const router=express.Router();

router.get("/getsocials",getsocials);
router.get("/getallsocials",getallsocials);
router.put("/updatesocials",updatesocials);

export default router;
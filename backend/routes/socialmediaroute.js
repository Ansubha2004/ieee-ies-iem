import express from "express";
import {getsocials,updatesocials} from "../controllers/socialmediacontroller.js"



const router=express.Router();

router.get("/getsocials",getsocials);
router.put("/updatesocials",updatesocials);

export default router;
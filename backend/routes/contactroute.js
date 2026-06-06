import express from "express";
import {getcontact} from "../controllers/contactcontroller.js"

const router=express.Router();


router.get("/getcontact",getcontact);

export default router;
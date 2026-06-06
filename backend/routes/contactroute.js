import express from "express";
import {getcontact,updatecontact} from "../controllers/contactcontroller.js"
import {updatecontactformValidation} from "../middlewares/formvalidation.js"

const router=express.Router();


router.get("/getcontact",getcontact);
router.put("/updatecontact",updatecontactformValidation,updatecontact);

export default router;
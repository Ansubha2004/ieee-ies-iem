import express from "express";
import {postenquiry,getallenquiry,deleteenquiryspecific,deleteenquirybystatus,updatestatus} from "../controllers/enquirycontroller.js";
import {FormValidation} from "../middlewares/formvalidation.js"

const router=express.Router();

router.post("/submitenquiry",FormValidation,postenquiry);
router.get("/getenquiries",getallenquiry);
router.delete("/deleteenquiry/:id",deleteenquiryspecific);
router.delete("/deleteenquiry/:status",deleteenquirybystatus);
router.put("/updatestatus/:id",updatestatus);


export default router;
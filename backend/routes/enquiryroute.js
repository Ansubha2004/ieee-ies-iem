import express from "express";
import {postenquiry,getallenquiry,deleteenquiryspecific,deleteenquirybystatus,updatestatus,searchenquiry,replyenquiry} from "../controllers/enquirycontroller.js";
import {FormValidation} from "../middlewares/formvalidation.js"

const router=express.Router();

router.post("/submitenquiry",FormValidation,postenquiry);
router.get("/getenquiries",getallenquiry);
router.delete("/deleteenquiry/:id",deleteenquiryspecific);
router.delete("/deleteenquiry/:status",deleteenquirybystatus);
router.put("/updatestatus/:id",updatestatus);
router.put("/replyenquiry/:id",replyenquiry);
router.get("/searchenquiry",searchenquiry)


export default router;
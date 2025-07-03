import express from "express"
import { FormValidation } from "../middlewares/formvalidation.js";
import {formdatasubmission} from "../controllers/formcontroller.js"

const router=express.Router();

router.post("/postdata",FormValidation,formdatasubmission);//posting data route

export default router;
import express from "express"
import { FormValidation } from "../middlewares/formvalidation.js";

const router=express.Router();

router.post("/postdata",FormValidation);//posting data route
router.get("/displaydata");//display the data

export default router;
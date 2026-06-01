import express from "express";
import { FormValidation } from "../middlewares/formvalidation.js";
import {
  formdatasubmission,
  getEnquiries,
  replyToEnquiry,
  deleteEnquiry,
} from "../controllers/formcontroller.js";

const router = express.Router();

router.post("/submitdata", FormValidation, formdatasubmission);
router.get("/enquiries", getEnquiries);
router.post("/enquiries/:id/reply", replyToEnquiry);
router.delete("/enquiries/:id", deleteEnquiry);

export default router;

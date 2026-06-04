import express from "express";
import { addcwc, getallcwcs, updatecwc, deletecwc } from "../controllers/cwccontroller.js";
import upload from "../middlewares/uploadimage.js";

const router = express.Router();

router.post("/addcwc", upload.single("image"), addcwc);
router.get("/getallcwc", getallcwcs);
router.put("/updatecwc/:id", upload.single("image"), updatecwc);
router.delete("/deletecwc/:id/:name", deletecwc);

export default router;

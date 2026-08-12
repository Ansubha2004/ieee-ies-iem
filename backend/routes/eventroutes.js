import express from "express";
import upload from "../middlewares/uploadimage.js";
import { addevent, getallevents } from "../controllers/eventcontroller.js";

const router = express.Router();

router.post("/addevent",upload.single("poster"),addevent);
router.get("/getallevents",getallevents);


export default router;

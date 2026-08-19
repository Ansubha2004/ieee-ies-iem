import express from "express";
import upload from "../middlewares/uploadimage.js";
import { addevent, getallevents,deleteevent } from "../controllers/eventcontroller.js";

const router = express.Router();

router.post("/addevent",upload.single("poster"),addevent);
router.get("/getallevents",getallevents);
router.delete("/deleteevent/:id",deleteevent);


export default router;

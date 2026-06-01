import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import formroute from "./routes/formroute.js";
import cwcroute from "./routes/cwcroute.js";
import { FormValidation } from "./middlewares/formvalidation.js";
import { formdatasubmission } from "./controllers/formcontroller.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:4173",
            "https://ieee-ies-iem-sbc.vercel.app",
        ],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
);


app.get("/", (req, res) => {
    return res.json({ success: true, message: "IEEE IES backend running successfully" })
})

app.use("/formapi", formroute);
app.use("/cwcapi", cwcroute);
app.post("/postdata", FormValidation, formdatasubmission);


app.all("*", (req, res) => {
    return res.json({ success: false, message: "invalid route" })
})


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})
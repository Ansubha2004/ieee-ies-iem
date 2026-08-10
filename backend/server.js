import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import cwcroute from "./routes/cwcroute.js";
import contactroute from "./routes/contactroute.js";
import socialmediaroute from "./routes/socialmediaroute.js";
import enquiryroute from "./routes/enquiryroute.js";
import eventroutes from "./routes/eventroutes.js";
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
            "https://admin-ieeeiesiem.vercel.app"
        ],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
);


app.get("/", (req, res) => {
    return res.json({ success: true, message: "IEEE IES backend running successfully" })
})


app.use("/cwcapi", cwcroute);
app.use("/contactapi",contactroute);
app.use("/socialmediaapi",socialmediaroute);
app.use('/enquiryapi',enquiryroute);
app.use('/eventapi',eventroutes);




app.all("*", (req, res) => {
    return res.json({ success: false, message: "invalid route" })
})


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})
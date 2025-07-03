import express from "express";
import cors from "cors";
import formroute from "./routes/formroute.js";

import dotenv from "dotenv";
dotenv.config();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:['http://localhost:5173',"https://ieee-ies-iem-sbc.vercel.app"],
        methods:['POST'],
        credentials:true
    })
);


app.get("/", (req, res) => {
    return res.json({ success: true, message: "IEEE IES backend running successfully" })
})

app.use('/',formroute);

app.all("*", (req, res) => {
    return res.json({ success: false, message: "invalid route" })
})


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})
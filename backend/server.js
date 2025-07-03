import express from "express";
import cors from "cors";




import dotenv from "dotenv";
dotenv.config();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    return res.json({ success: true, message: "IEEE IES backend running successfully" })
})

app.all("*", (req, res) => {
    return res.json({ success: false, message: "invalid path" })
})


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})
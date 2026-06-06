import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    institute:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mapurl:{
        type:String,
        required:true
    }
}, { timestamps: true });

export default mongoose.model("Contact",contactSchema);
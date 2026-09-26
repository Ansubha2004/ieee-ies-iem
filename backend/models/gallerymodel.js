import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    galleryimage: {
        type: String,
        required: true
    },
    imageid: {
        type: String,
        required: true
    }
}, { timestamps: true });


export default mongoose.model("Gallery", gallerySchema);
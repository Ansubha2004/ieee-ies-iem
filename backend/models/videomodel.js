import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    video: {
        type: String,
        required: true
    },
    videoid: {
        type: String,
        required: true
    }
}, { timestamps: true });


export default mongoose.model("Video", videoSchema);
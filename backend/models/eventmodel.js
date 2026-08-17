import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    poster:{
        type: String,
        required: true
    },
    posterid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        enum:["SEMINAR","WORKSHOP","INDUSTRY VISIT","AWARNESS PROGRAM","FLAGSHIP CELEBRATION","CHARITY EVENT","TECHNICAL WEEK","HACKATHON/COMPETITION","DISTINGUISHED LECTURE","OTHERS"],
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    eventdate: {
        type: String,
        required: true
    },
    gallery: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:["upcoming","completed","cancelled","ongoing"],
        required: true
    },
    
},{ timestamps: true });

export default mongoose.model("Event", eventSchema);
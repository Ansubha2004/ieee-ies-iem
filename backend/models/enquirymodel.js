import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
   
    subject: {
        type: String,
        required: true,
        trim:true,
        minlength: 5,
        maxlength: 50
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1000
    },
    status:{
        type:String,
        enum:["new","in-progress","responded"],
        default:"new"
    },
    messageId:{
        type:String,
        required:true,
    },
    reply:{
        type:String,
        default:""
    
    },
    replyDate:{
        type:Date,
        default:null
    },
    date: {
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Enquiry",enquirySchema)
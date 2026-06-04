import mongoose from "mongoose";

const cwcSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    socialmedia:[{
        platform:{
            type:String,
            required:true
        },
        link:{
            type:String,
            required:true
        }
    }]
},{timestamps:true});


export default mongoose.model("CWC",cwcSchema);
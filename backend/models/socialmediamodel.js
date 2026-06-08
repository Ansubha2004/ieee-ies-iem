import mongoose from "mongoose";

const socialmediaSchema = new mongoose.Schema({
    linkedin: {
        url: String,
        enabled: Boolean
      },
    instagram: {
      url: String,
      enabled: Boolean
    },
    facebook: {
      url: String,
      enabled: Boolean
    },
    youtube: {
        url: String,
        enabled: Boolean
      },
      x: {
        url: String,
        enabled: Boolean
      }
    
  });


export default mongoose.model("Socialmedia",socialmediaSchema);
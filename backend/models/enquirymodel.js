import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "replied"],
      default: "new",
    },
    replyMessage: { type: String, default: "" },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);

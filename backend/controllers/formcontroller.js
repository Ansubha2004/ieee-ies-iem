import Enquiry from "../models/enquirymodel.js";
import SendMail, { SendReplyMail } from "../utils/mailer.js";

export const formdatasubmission = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.json({ success: false, message: "Empty credentials..." });
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      status: "new",
    });

    SendMail(name.trim(), email.trim(), message.trim());

    return res.json({
      success: true,
      message: "Form submitted successfully",
      data: enquiry,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while form submission",
      error: err.message,
    });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== "all" ? { status } : {};
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    return res.json({
      success: true,
      message: "Enquiries fetched",
      data: enquiries,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: err.message,
    });
  }
};

export const replyToEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    if (!replyMessage?.trim()) {
      return res.json({ success: false, message: "Reply message is required" });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.json({ success: false, message: "Enquiry not found" });
    }

    await SendReplyMail(
      enquiry.name,
      enquiry.email,
      replyMessage.trim(),
      enquiry.message
    );

    enquiry.status = "replied";
    enquiry.replyMessage = replyMessage.trim();
    enquiry.repliedAt = new Date();
    await enquiry.save();

    return res.json({
      success: true,
      message: "Reply sent successfully",
      data: enquiry,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to send reply",
      error: err.message,
    });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.json({ success: false, message: "Enquiry not found" });
    }
    return res.json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
      error: err.message,
    });
  }
};

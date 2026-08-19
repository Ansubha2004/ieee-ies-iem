import eventmodel from "../models/eventmodel.js";
import cloudinary from "../config/cloudinary.js";

export const addevent = async (req, res) => {
  try {
    const { id, link, name, description, venue, eventdate, gallery, details, status } = req.body;
    if (!name || !id || !link || !description || !venue || !eventdate || !gallery || !details || !status) {
      return res.json({
        success: false,
        message: "Fill the event details",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image not uploaded",
      });
    }
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "events_folder",
    });

    const createevent = await eventmodel.create({
      id,
      link,
      poster: result.secure_url,
      posterid: result.public_id,
      name,
      description,
      venue,
      eventdate,
      gallery,
      details,
      status
    });
    return res.json({
      success: true,
      message: "All event details uploaded successfully",
      data: createevent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding event data to db",
      error: error.message,
    });
  }
}

export const getallevents = async (req, res) => {
  try {
    const allevents = await eventmodel.find().sort({ id: 1 });
    return res.json({
      success: true,
      message: "All events data fetched successfully",
      data: allevents,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error fetching all event details",
      error: error.message,
    });
  }
};

export const deleteevent = async (req, res) => {
  try {
    const { id: mongoId } = req.params;
    const deleteimage = await eventmodel.findById(mongoId);

    if (!deleteimage) {
      return res.json({
        success: false,
        message: 'Event data not there'
      })
    }

    if (deleteimage.posterid) {
      await cloudinary.uploader.destroy(
        deleteimage.posterid
      )
    }

    const deleteevent = await eventmodel.findByIdAndDelete(mongoId);
    if (!deleteevent) {
      return res.json({ success: false, message: "Cant delete event as it doesnt exists" });
    }

    return res.json({
      success: true,
      message: "Event data deleted successfully",
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting this event data",
      error: err.message,
    });
  }
} 
import multer from "multer";

const storage = multer.memoryStorage();

const uploadvideo = multer({
    storage,

    limits: {
        fileSize: 100 * 1024 * 1024 // 50 MB
    },

    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith("video/")) {
            return cb(null, true);
        }

        return cb(
            new Error("Only video files are allowed"),
            false
        );
    }
});

export default uploadvideo;
import multer from "multer";
const storage=multer.memoryStorage();

const upload=multer({
    storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith("image/")){
            return cb(null,true);
        }
        return cb(new Error("Only images are allowed"),false);
    }
})
export default upload;
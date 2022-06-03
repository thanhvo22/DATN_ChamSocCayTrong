const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
    

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  ||
       file.mimetype ==="image/jpeg"  ||
       file.mimetype ===  "image/png"){

    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
const upload = multer({storage: storage, fileFilter : fileFilter});
module.exports = upload;
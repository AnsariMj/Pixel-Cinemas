const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  )
    /* `cb(null, true);` is a callback function that is used to indicate that the file should be accepted and saved. The first argument `null` indicates that there is no error, and the second argument `true` indicates that the file should be accepted. */
    cb(null, true);
  /* The line `else cb(null, false)` is used to indicate that the file should not be accepted and saved. The first argument `null` indicates that there is no error, and the second argument `false` indicates that the file should not be accepted. */
   else
    cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(" Error delete file: ", err);
    } else {
      // console.log(" File deleted Successfully");
    }
  });
}
module.exports = {
  upload,
  deleteFile,
};

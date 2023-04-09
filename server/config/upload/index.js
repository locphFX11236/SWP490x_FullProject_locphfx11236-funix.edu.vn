const multer = require("multer");

const { fileStorage, fileFilter } = require("./multer");

const Upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
});

module.exports = Upload;

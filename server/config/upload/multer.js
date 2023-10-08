const path = require("path");
const multer = require("multer");

const mainPath = require("../helper");

exports.fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathToImg = path.join(mainPath, "public/asset/img");
        cb(null, pathToImg);
    },
    filename: (req, file, cb) => {
        const fileName = `${req.body.fileName}-${file.originalname}`;
        cb(null, fileName);
    },
});

exports.fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

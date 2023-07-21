const fs = require("fs");
const path = require("path");

const DeleteFile = (filePath) => {
    fs.unlink(path.join("public/", filePath), (err) => {
        // fs.unlink là xóa file bằng đường link
        if (err) throw err;
        console.log("File deleted!");
    });
};

exports.DeleteFile = DeleteFile;

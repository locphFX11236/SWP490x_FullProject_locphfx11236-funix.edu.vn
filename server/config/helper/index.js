const { DeleteFile } = require("./deleteFile");
const isAuthenticated = require("./isAuth");
const mainPath = require("./mainPath");

module.exports = {
    DeleteFile,
    isAuth: isAuthenticated,
    mainPath,
};

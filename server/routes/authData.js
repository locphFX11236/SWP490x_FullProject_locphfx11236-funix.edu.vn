const express = require("express");
const { AuthDataController } = require("../controller");
const router = express.Router();

router.post(
    "/login", // Bắt lấy path này
    AuthDataController.PostAuth // Lấy function PostAuth để xử lý router
);

router.post(
    "/logout", // Bắt lấy path này
    AuthDataController.PostLogOut // Lấy function PostLogOut để xử lý router
);

module.exports = router;

const express = require("express");
const { OtherController } = require("../controller");
const router = express.Router();

router.post(
    "/postImg", // Bắt lấy path này
    OtherController.PostImg // Lấy function PostAuth để xử lý router
);

module.exports = router;

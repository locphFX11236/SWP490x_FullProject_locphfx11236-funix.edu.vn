const express = require("express");
const isAuth = require("../config/helper/isAuth");
const { OtherController } = require("../controller");
const router = express.Router();

router.post(
    "/postImg", // Bắt lấy path này
    isAuth,
    OtherController.PostImg // Lấy function PostAuth để xử lý router
);

module.exports = router;

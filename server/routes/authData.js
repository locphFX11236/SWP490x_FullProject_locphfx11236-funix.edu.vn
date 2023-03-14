const express = require('express');
const { AuthDataController } = require('../controller');
const router = express.Router();

router.post( // Sử dụng phương thức get để thực hiện router
    '/login', // Bắt lấy path này
    AuthDataController.PostAuth, // Lấy function PostAuth để xử lý router
);

router.post( // Sử dụng phương thức get để thực hiện router
    '/logout', // Bắt lấy path này
    AuthDataController.PostLogOut, // Lấy function PostLogOut để xử lý router
);

module.exports = router;
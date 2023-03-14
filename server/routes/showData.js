const express = require('express');
const { ShowDataController } = require('../controller');
const router = express.Router();

router.get( // Sử dụng phương thức get để thực hiện router
    '/', // Bắt lấy path này
    ShowDataController.GetIndex
);

router.post( // Sử dụng phương thức get để thực hiện router
    '/addprogram', // Bắt lấy path này
    ShowDataController.AddCollection
);

module.exports = router;
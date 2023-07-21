const cors = require("cors");

const MiddlewareCORS = () =>
    cors({
        origin: process.env.FRONTEND_URI,
        methods: ["POST", "PATCH", "GET", "DELETE"],
        optionsSuccessStatus: 200,
        credentials: true,
    });

module.exports = MiddlewareCORS;

const cors = require("cors");

module.exports = cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
});

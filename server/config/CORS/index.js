const cors = require("cors");

const optionCustom = {
    origin: "http://localhost:3000",
    methods: ["POST", "PATCH", "GET", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
};

module.exports = cors(optionCustom);

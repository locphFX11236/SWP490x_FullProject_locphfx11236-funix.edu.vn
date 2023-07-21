const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const Connect = async () => mongoose.connect(process.env.MONGODB_URI);

module.exports = Connect;

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const Connect = async (MONGODB_URI) => mongoose.connect(MONGODB_URI);

module.exports = Connect;
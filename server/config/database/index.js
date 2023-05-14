const Connect = require("./mongoose");

const HandleDatabase = (listen, MONGODB_URI) =>
    Connect(MONGODB_URI)
        // Connect to databse
        .then(() => listen())
        .catch((err) => {
            listen();
            console.log(err);
        });

module.exports = HandleDatabase;

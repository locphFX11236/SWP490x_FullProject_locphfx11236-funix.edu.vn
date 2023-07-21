const Connect = require("./mongoose");

const HandleDatabase = (listen) =>
    Connect()
        // Connect to databse
        .then(() => listen())
        .catch((err) => {
            listen();
            console.log(err);
        });

module.exports = HandleDatabase;

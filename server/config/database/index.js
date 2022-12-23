const Connect = require('./mongoose');

const HandleDatabase = (listen, MONGODB_URI) => {
    // Connect to databse
    Connect(MONGODB_URI)
        .then(() => listen())
        .catch(err => {
            listen();
            console.log(err);
        })
    ;
};

module.exports = HandleDatabase;
// const Tool = require('.//fakeTool');
// const CloneData = require('./cloneData');
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

    // Clone data
    // CloneData('All');

    // Fake data
    // Tool();
};

module.exports = HandleDatabase;
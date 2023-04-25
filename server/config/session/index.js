const session = require("express-session");
const connect = require("connect-mongodb-session");

const MongoDBStore = connect(session);

const MiddlewareSession = (MONGODB_URI) =>
    session({
        store: new MongoDBStore({
            uri: MONGODB_URI,
            collection: "sessions",
            expires: 1000 * 60 * 5,
        }),
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: false, maxAge: 1000 * 60 * 3 },
    });

module.exports = MiddlewareSession;

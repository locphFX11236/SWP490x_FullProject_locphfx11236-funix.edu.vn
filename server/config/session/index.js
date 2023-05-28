const session = require("express-session");
const connect = require("connect-mongodb-session");

const MongoDBStore = new connect(session);

const MiddlewareSession = (MONGODB_URI) =>
    session({
        name: "SessionID", // Tên của cookie
        secret: "my secret",
        resave: false, // Session không được lưu đối với mọi req, chỉ với mọi res
        saveUninitialized: false, // Sesion không được lưu với req không có gì thay đổi
        cookie: {
            secure: false,
            sameSite: "lax",
            httpOnly: false,
            maxAge: 1000 * 60 * 30,
        },
        store: MongoDBStore({
            uri: MONGODB_URI,
            collection: "sessions",
            expires: 1000 * 60 * 60 * 24 * 7,
        }),
    });

module.exports = MiddlewareSession;

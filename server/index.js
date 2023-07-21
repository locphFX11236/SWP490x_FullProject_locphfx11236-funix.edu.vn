const path = require("path");

require("dotenv/config");
const express = require("express");

const Database = require("./config/database");
const Upload = require("./config/upload");
const CORS = require("./config/cors");
const Session = require("./config/session");
const Passport = require("./config/passport");
const { showRoutes, authRoutes, ortherRoutes } = require("./routes");
// const CloneSamples = require('./data/handle');

const app = express();
const OAuth2 = () => Passport(app);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    "/public/asset", // Path truy cập từ trình duyệt (path tuyệt đối)
    express.static(path.join(__dirname, "public/asset")) // Path trong file chứa project
); // Xữ lý file tĩnh cho trình duyệt truy cập trực tiếp
app.use(Upload.single("imgFile")); // Handle upload image
app.use(CORS());
app.use(Session());
app.use(OAuth2());

// Các Routes
app.use(showRoutes);
app.use(authRoutes);
app.use(ortherRoutes);

// Handle to database
Database(() => app.listen(process.env.BACKEND_PORT));
// CloneSamples.CloneData('All');
// CloneSamples.Tool();

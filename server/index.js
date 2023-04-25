const path = require("path");

const express = require("express");
const cors = require("cors");

const Database = require("./config/database");
const { showRoutes, authRoutes, ortherRoutes } = require("./routes");
const Upload = require("./config/upload");
const Session = require("./config/session");
// const CloneSamples = require('./data/handle');

const MONGODB_URI = "mongodb://localhost:27017/charity_app_dev";
const PORT = 5000;
const app = express();

// Middleware
app.use(Session(MONGODB_URI));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    "/public/asset", // Path truy cập từ trình duyệt (path tuyệt đối)
    express.static(path.join(__dirname, "public/asset")) // Path trong file chứa project
); // Xữ lý file tĩnh cho trình duyệt truy cập trực tiếp
app.use(Upload.single("imgFile")); // Handle upload image
app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

// Các Routes
app.use(showRoutes);
app.use(authRoutes);
app.use(ortherRoutes);

// Handle to database
Database(() => app.listen(PORT), MONGODB_URI);
// CloneSamples.CloneData('All');
// CloneSamples.Tool();

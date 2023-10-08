const path = require("path");

require("dotenv/config");
const express = require("express");

const config = require("./config");
const allRoutes = require("./routes");
const { HandleSamplesData } = require("./data");

const app = express();
const { Passport, CORS, Database, Session, SetTemplate, Upload } = config;
const { showRoutes, authRoutes, ortherRoutes } = allRoutes;
const OAuth2 = () => Passport(app);
const ViewEngine = () => SetTemplate(app);
const Listen = () => app.listen(process.env.BACKEND_PORT);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    "/public/asset", // Path truy cập từ trình duyệt (path tuyệt đối)
    express.static(path.join(__dirname, "public/asset")) // Path trong file chứa project
); // Xữ lý file tĩnh cho trình duyệt truy cập trực tiếp
app.use(ViewEngine());
app.use(Upload.single("imgFile")); // Handle upload image
app.use(CORS());
app.use(Session());
app.use(OAuth2());

// Các Routes
app.use(showRoutes);
app.use(authRoutes);
app.use(ortherRoutes);

// Handle to database
HandleSamplesData({
    // clone: false | 'All' | 'Organizations' | 'Users' | 'Programs' | 'News' | 'Donations'
    clone: false,
    // tool: false | true
    tool: false,
});
Database(Listen);

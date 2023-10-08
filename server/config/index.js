const NodeFetch = require("./api");
const Passport = require("./auth");
const CORS = require("./cors");
const Database = require("./database");
const helper = require("./helper");
const { SendMail } = require("./mail");
const Session = require("./session");
const { SetTemplate } = require("./template");
const Upload = require("./upload");

module.exports = {
    NodeFetch,
    Passport,
    CORS,
    Database,
    ...helper,
    SendMail,
    Session,
    SetTemplate,
    Upload,
};

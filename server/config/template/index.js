exports.SetTemplate = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./views");
    return (req, res, next) => next();
};

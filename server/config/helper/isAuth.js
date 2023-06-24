const isAuthenticated = (req, res, next) => {
    if (req.session.user) next();
    else {
        res.set("Access-Control-Allow-Origin", "http://localhost:3000");
        res.set("Access-Control-Allow-Credentials", "true");
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.status(500).json({
            message:
                "Re-Loading thất bại!\
                Phiên đăng nhập hết hạn,\
                vui lòng đăng nhập lại",
            result: "err",
        });
        return res.end();
    }
};

module.exports = isAuthenticated;

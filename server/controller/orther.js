exports.PostImg = (req, res, next) => {
    const data = req.file;
    const response = `asset/img/${data.filename}`;
    return res.json(response);
};

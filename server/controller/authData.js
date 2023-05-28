const { DeleteFile } = require("../config/helper/deleteFile");
const Users = require("../models/users");

exports.PostAuth = (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const result = {
        user_id: "",
        isAdmin: false,
        isLogin: false,
        message: "Phone numbers don't match",
    };

    if (phoneNumber) {
        return Users.find()
            .then((users) => {
                const user = users.find((p) => p.phoneNumber === phoneNumber);
                return [users, user];
            })
            .then(([users, user]) => {
                if (user) {
                    const isConnect = user.password === password;
                    if (isConnect) {
                        result.user_id = user._id;
                        result.isAdmin = user.isAdmin;
                        result.isLogin = true;
                        result.message = "Login Success!";
                        if (result.isAdmin) result.data = users;
                        else result.data = [user];
                    } else {
                        result.message = "Password don't match!";
                    }
                }
                return result;
            })
            .then(() => {
                req.session.user = result;
                res.setHeader("Content-Type", "text/html");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                console.log("Log In:", req.sessionID);
                return res.json(result);
            })
            .catch((err) => console.log(err))
            .finally(() => res.end());
    } else return next();
};

exports.GetAuth = (req, res, next) => {
    const result = req.session.user;
    if (result) return res.json(result);
    else {
        res.json({
            message: "!",
            result: "err",
        });
        return res.end();
    }
};

exports.PostLogOut = (req, res, next) => {
    console.log("Log Out:", req.sessionID);
    req.session.destroy();
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", "true");
    res.json({
        message: "Logout success!",
        result: {},
    });
    return res.end();
};

exports.AddUser = (req, res, next) => {
    const userObject = req.body;
    const user = new Users(userObject);

    return user
        .save()
        .then((result) => {
            console.log(result);
            if (!result) {
                res.json({
                    message: "User already exists!",
                    result: "err",
                });
                throw new Error("User already exists!");
            } else return result;
        })
        .then((result) =>
            res.json({
                message: "You created user collection!",
                endpoint: "/addUser",
                id: result._id,
                result: result,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            res.json({
                message:
                    "Information already exists.\
                    Change information, please!",
                result: "err",
            });
            return next(error);
        })
        .finally(() => res.end());
};

exports.UpdateUser = async (req, res, next) => {
    const { _id, ...rest } = req.body;

    return Users.findByIdAndUpdate(_id, rest)
        .then((result) => {
            if (!result) {
                const { email, name, phoneNumber } = rest;
                return Users.findOneAndUpdate(
                    { email, name, phoneNumber },
                    rest
                );
            } else return result;
        })
        .then((result) => {
            if (!result) {
                res.json({
                    message: "Incorrect information!",
                    result: "err",
                });
                throw new Error("Incorrect information!");
            } else return result;
        })
        .then((result) => {
            const isChangeImg = rest.imgAvatar !== result._doc.imgAvatar;
            const isAuto =
                result._doc.imgAvatar === "asset/img/auto_insert_img.jpg";
            if (isChangeImg && !isAuto) {
                DeleteFile(result._doc.imgAvatar);
                return { ...result._doc, ...rest };
            } else return { ...result._doc, ...rest };
        })
        .then((result) =>
            res.json({
                message: "You updated user collection!",
                endpoint: `/patchUser/${result._id}`,
                id: result._id,
                result: result,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        })
        .finally(() => res.end());
};

exports.DeleteUser = async (req, res, next) => {
    const id = req.params.id;
    const admin_id = req.params.admin_id;

    return Users.findByIdAndDelete(id)
        .then((result) => {
            const isAuto = result.imgAvatar === "asset/img/auto_insert_img.jpg";
            if (!isAuto) {
                DeleteFile(result.imgAvatar);
                return result;
            } else return result;
        })
        .then((result) =>
            res.json({
                message: "You deleted user collection!",
                endpoint: `/deleteUser/${id}/${admin_id}`,
                id: id,
                result: result,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            res.json({
                message: "Not found!",
                result: "err",
            });
            return next(error);
        })
        .finally(() => res.end());
};

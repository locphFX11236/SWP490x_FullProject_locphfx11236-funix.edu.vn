const bcrypt = require("bcryptjs");

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
                const index = users.findIndex(
                    (p) => p.phoneNumber === phoneNumber
                );
                return [users, index];
            })
            .then(([users, index]) => {
                const user = users[index];
                if (user) {
                    return bcrypt
                        .compare(password, user.password)
                        .then((isConnect) => {
                            if (isConnect) {
                                result.user_id = user._id;
                                result.isAdmin = user.isAdmin;
                                result.isLogin = true;
                                users[index].password = password;
                                if (result.isAdmin) result.data = users;
                                else result.data = [user];
                            } else {
                                result.message = "Password don't match!";
                            }
                            return result;
                        });
                } else return result;
            })
            .then(() => {
                req.session.user = result;
                res.setHeader("Content-Type", "text/html");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                console.log("Log In:", req.sessionID);
                return res.json({
                    message: "Login",
                    result,
                });
            })
            .catch((err) => console.log(err))
            .finally(() => res.end());
    } else return next();
};

exports.GetAuth = (req, res, next) => {
    const result = req.session.user;
    try {
        res.json({
            message: "Re-Loading",
            result,
        });
        return res.end();
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.PostLogOut = (req, res, next) => {
    console.log("Log Out:", req.sessionID);
    try {
        req.session.destroy();
        res.set("Access-Control-Allow-Origin", "http://localhost:3000");
        res.set("Access-Control-Allow-Credentials", "true");
        res.json({
            message: "Logout",
            result: {},
        });
        return res.end();
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.AddUser = async (req, res, next) => {
    const userObject = req.body;
    const hashPass = await bcrypt.hash(userObject.password, 12);
    const user = new Users({
        ...userObject,
        password: hashPass,
    });
    console.log("Pass", userObject.password, hashPass);

    return user
        .save()
        .then((result) => {
            if (!result) {
                throw new Error();
            } else return result;
        })
        .then((result) => {
            const newResult = req.session.user.data;
            newResult.push(result);
            req.session.user.data = newResult;
            return result;
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
        .then((result) => {
            const newResult = req.session.user.data;
            const index = newResult.findIndex((r) => r._id === id);
            newResult[index] = result;
            req.session.user.data = newResult;
            return result;
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
        .then((result) => {
            const newResult = req.session.user.data;
            const index = newResult.findIndex((r) => r._id === id);
            newResult.splice(index, 1);
            req.session.user.data = newResult;
            return result;
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

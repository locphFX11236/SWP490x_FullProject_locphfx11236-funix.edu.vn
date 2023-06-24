const bcrypt = require("bcryptjs");

const { DeleteFile } = require("../config/helper/deleteFile");
const Users = require("../models/users");

const SendClient = (res, { message, result, ...rest }) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", "true");
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.json({
        message,
        result,
        ...rest,
    });
};

exports.PostAuth = (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const result = {
        user_id: "",
        isAdmin: false,
        isLogin: false,
        data: [],
    };

    if (phoneNumber) {
        return Users.find()
            .then((users) => {
                const index = users.findIndex(
                    (p) => p.phoneNumber === phoneNumber
                );
                if (index !== -1) {
                    return [users, index];
                } else throw "Phone numbers don't match";
            })
            .then(([users, index]) => {
                const user = users[index];
                result.user_id = user._id;
                result.isAdmin = user.isAdmin;
                return bcrypt
                    .compare(password, user.password)
                    .then((isConnect) => {
                        if (isConnect) {
                            result.isLogin = true;
                            return;
                        } else {
                            throw "Password don't match!";
                        }
                    })
                    .then(() => {
                        if (result.isAdmin) result.data = users;
                        else result.data = [user];
                        req.session.user = result;
                        console.log("Log In:", req.sessionID);
                        return "Login success!";
                    });
            })
            .then((message) =>
                SendClient(res, {
                    message,
                    result,
                })
            )
            .catch((err) =>
                SendClient(res, {
                    message: err,
                    result: "err",
                })
            )
            .finally(() => res.end());
    } else return next();
};

exports.GetAuth = (req, res, next) => {
    const result = req.session.user;
    SendClient(res, {
        message: "Re-Loading",
        result,
    });
    return res.end();
};

exports.PostLogOut = (req, res, next) => {
    try {
        console.log("Log Out:", req.sessionID);
        req.session.destroy();
        SendClient(res, {
            message: "Logout",
            result: {},
        });
        return res.end();
    } catch (err) {
        res.status(500);
        return SendClient(res, {
            message: "Logout thất bại!",
            result: "err",
        });
    }
};

exports.AddUser = async (req, res, next) => {
    const userObject = req.body;
    const hashPass = await bcrypt.hash(userObject.password, 12);
    const user = new Users({
        ...userObject,
        password: hashPass,
    });

    return user
        .save()
        .then((result) => {
            if (!result) {
                throw new Error();
            } else return result;
        })
        .then((result) => {
            const isSignIn = req.session.user;
            if (isSignIn) {
                const newResult = isSignIn.data;
                newResult.push(result);
                req.session.user.data = newResult;
                return result;
            } else return result;
        })
        .then((result) =>
            SendClient(res, {
                message: "You created user collection!",
                result: result,
                endpoint: "/addUser",
                id: result._id,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            res.status(500);
            SendClient(res, {
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
    const { _id, password, ...rest } = req.body;

    return Users.findByIdAndUpdate(_id, rest)
        .then(async (result) => {
            if (!result) {
                const { email, name, phoneNumber } = rest;
                return Users.findOneAndUpdate(
                    { email, name, phoneNumber },
                    rest
                );
            } else {
                const hashPass = await bcrypt.hash(password, 12);
                result.password = hashPass;
                return result.save();
            }
        })
        .then((result) => {
            if (!result) {
                SendClient(res, {
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
            const index = newResult.findIndex((r) => r._id === _id);
            newResult[index] = result;
            req.session.user.data = newResult;
            return result;
        })
        .then((result) =>
            SendClient(res, {
                message: "You updated user collection!",
                result: result,
                endpoint: `/patchUser/${result._id}`,
                id: result._id,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
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
            SendClient(res, {
                message: "You deleted user collection!",
                endpoint: `/deleteUser/${id}/${admin_id}`,
                id: id,
                result: result,
            })
        )
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            res.status(500);
            SendClient(res, {
                message: "Not found!",
                result: "err",
            });
            return next(error);
        })
        .finally(() => res.end());
};

exports.History = async (data) => {
    const { _id, history } = data;
    return Users.findById(_id)
        .then((user) => {
            user.history.push(history);
            return user.save();
        })
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

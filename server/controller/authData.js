const bcrypt = require("bcryptjs");
const passport = require("passport");

const { SendMail, DeleteFile } = require("../config");
const { Users } = require("../models");

const SendClient = (res, { message, result, ...rest }) => {
    res.set("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
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
    console.log("Log In:", req.sessionID);

    if (phoneNumber) {
        return Users.find()
            .then((users) => {
                const index = users.findIndex(
                    (p) => p.phoneNumber === phoneNumber
                );
                if (index !== -1) {
                    return [users, index];
                } else throw "Phone numbers don't match\nor unconfirmed email";
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

exports.GoogleAsk = (req, res, next) =>
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })(req, res, next);

exports.GoogleCallback = (req, res, next) =>
    passport.authenticate("google", (err, user, info, status) =>
        res.render("oAuth2", {
            oauth2: "Google",
            result: !err ? "Success" : "Failure",
            text: !err ? `Hello ${user.data[0].name}!` : "Đã xảy ra lỗi",
            FRONTEND_URI: process.env.FRONTEND_URI,
        })
    )(req, res, next);

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
    const { phoneNumber, password, ...rest } = req.body;
    const hashPass = await bcrypt.hash(password, 12);
    const hashCoded = hashPass.slice(-7, -2);
    const user = new Users({
        ...rest,
        phoneNumber: `${phoneNumber}~(Unconfirmed):${hashCoded}:`,
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
        .then(async (result) => {
            // Send email to confirm
            const token = await bcrypt.hash(hashCoded, 12);
            const url =
                process.env.BACKEND_PORT != 5000
                    ? process.env.BACKEND_PORT
                    : process.env.LOCALHOST_URL;
            const verifyLink = `${url}/verify?id=${result._id}&token=${token}`;
            const mailContent = `<div style="text-align:center;">
                <h3>Bạn đã đăng ký với email: <i>${result.email}</i></h3>
                <p>Vui lòng click vào link dưới đây để verify tài khoản</p>
                <a href="${verifyLink}">CLICK HERE TO VERIFY</a>
            </div>`;
            SendMail({
                to: result.email,
                subject: "Verify Email",
                htmlContent: mailContent,
            });

            return result;
        })
        .then((result) =>
            SendClient(res, {
                message:
                    "You created user collection!\
                    \nAnd need confirm with email.",
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
                    \nChange information, please!",
                result: "err",
            });
            return next(error);
        })
        .finally(() => res.end());
};

exports.UpdateUser = async (req, res, next) => {
    const { _id, email, password, hashPass, ...rest } = req.body;

    return Users.findOneAndUpdate({ email }, rest)
        .then((result) => {
            console.log("Aaa", result);
            if (!result) {
                SendClient(res, {
                    message: "Incorrect information!",
                    result: "err",
                });
                throw Error("Incorrect information!");
            } else return result;
        })
        .then(async (result) => {
            if (!hashPass) {
                const _hashPass = await bcrypt.hash(password, 12);
                result.password = _hashPass;
                return await result.save();
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
            if (req.session.user) {
                const newResult = req.session.user.data;
                const index = newResult.findIndex((r) => r._id === _id);
                newResult[index] = result;
                req.session.user.data = newResult;
                return result;
            } else {
                // Send email to get pass
                const mailContent = `<div style="text-align:center;">
                    <p>Bạn nên thay đổi mật khẩu lại sau đăng nhập</p>
                    <p>Vui lòng click vào <a href="${process.env.FRONTEND_URI}">link</a> để đăng nhập tài khoản</p>
                    <p>Mật khẩu của bạn là: ${password}</p>
                </div>`;
                SendMail({
                    to: result.email,
                    subject: "Get Password Email",
                    htmlContent: mailContent,
                });

                return result;
            }
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
            const outFile = result.imgAvatar.includes("http");
            if (!isAuto && !outFile) {
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

exports.Verify = async (req, res, next) => {
    const id = req.query.id;
    const token = req.query.token;

    return Users.findById(id)
        .then(async (user) => {
            if (user) {
                const hashCoded = user.password.slice(-7, -2);
                return bcrypt.compare(hashCoded, token).then((isRight) => {
                    if (isRight) {
                        const confirm = user.phoneNumber.split("~");
                        user.phoneNumber = confirm[0];
                        user.save();
                        return res.redirect(process.env.FRONTEND_URI);
                    } else {
                        throw "Wrong token!";
                    }
                });
            } else {
                throw "Wrong id!";
            }
        })
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;
            return next(error);
        });
};

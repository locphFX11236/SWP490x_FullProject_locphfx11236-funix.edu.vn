const { DeleteFile } = require("../config/helper/deleteFile");
const Users = require("../models/users");

exports.PostAuth = (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const result = {
        user_id: "",
        isAdmin: false,
        isLogin: false,
        message: "Phone numbers don't match",
        data: [],
    };

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
                    result.message = "Success Login";
                    if (result.isAdmin) result.data = users;
                    else result.data = [user];
                } else {
                    result.message = "Password don't match";
                }
            }
            return result;
        })
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
};

exports.PostLogOut = (req, res, next) => {
    return res.end();
};

exports.AddUser = (req, res, next) => {
    const userObject = req.body;
    const user = new Users(userObject);

    return user
        .save()
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
            return next(error);
        });
};

exports.UpdateUser = async (req, res, next) => {
    const { _id, ...rest } = req.body;

    return Users.findByIdAndUpdate(_id, rest)
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
                endpoint: `/patchUser/${_id}`,
                id: _id,
                result: result,
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
            return next(error);
        });
};

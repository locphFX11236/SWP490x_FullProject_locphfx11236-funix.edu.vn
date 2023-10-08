import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import moment from "moment";

import RequestBE from "../../../data";
import { AuthDataSlice, ShowDataSlice } from "../slice";
import { ProgramForm, UserForm } from "../contructors";

export const RestAPIShow = createAsyncThunk(
    "Thunk/get",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        const response = await RequestBE.GetShowData();
        return response;
    }
);

export const UploadImg = createAsyncThunk(
    "Thunk/postImg",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        const dispatch = thunkAPI.dispatch;
        const { keyForm, data } = params;
        const { imgFiles, index, oldVal } = data;

        const formData = new FormData();
        const Post = async (data) => await RequestBE.PostImg(data);
        let response = { payload: "asset/img/auto_insert_img.jpg" };

        formData.append("fileName", `${keyForm}-${moment().valueOf()}`);
        formData.append("imgFile", imgFiles[0]);

        response = await Post(formData);
        console.log(response);
        if (oldVal) {
            const reduxAction = AuthDataSlice.actions[`Update${keyForm}`];
            const updateUser = { ...oldVal, imgAvatar: response };
            dispatch(reduxAction({ stt: index + 1, updateUser }));
            RequestBE.UpdateCollection(keyForm, updateUser);
            return response;
        } else {
            return response;
        }
    }
);

const messageToUser = (key, res) =>
    res.result === "err"
        ? message.error(res.message)
        : message.success(`${key} success!`);

export const ProgramCollections = createAsyncThunk(
    "Thunk/changeProgram",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        // Xử lý payload
        const { keyForm, data } = params;
        const { oldVal, values, admin } = data;
        const {
            imgProgram,
            moneyCurrent,
            moneyRate,
            imgUpFile,
            ...restPostValues
        } = values;
        const KEY = "Program";
        const programObject = ProgramForm(restPostValues);
        const dispatch = thunkAPI.dispatch;
        const reduxAction = ShowDataSlice.actions[keyForm + KEY];
        const handlePromise = Promise.resolve();
        handlePromise
            .then(() => {
                const hasFile = imgUpFile?.length > 0;
                const isNull = !imgProgram;
                const isDelete = keyForm === "Delete";
                if (hasFile && !isDelete) {
                    const imgUrl = dispatch(
                        UploadImg({
                            keyForm: KEY,
                            data: { imgFiles: imgUpFile },
                        })
                    );
                    return imgUrl;
                } else if (isNull) {
                    return { payload: "asset/img/auto_insert_img.jpg" };
                } else {
                    return { payload: imgProgram };
                }
            })
            .then((imgUrl) => {
                programObject.imgProgram = imgUrl.payload;
                return;
            })
            .then(() => {
                switch (keyForm) {
                    case "Create": {
                        return RequestBE.CreateCollection(KEY, {
                            ...programObject,
                            management: [
                                {
                                    admin_id: admin.admin_id,
                                    descriptionChange: `${keyForm}d by ${admin.name}.`,
                                    executionTime: moment().toISOString(),
                                },
                            ],
                        });
                    }

                    case "Update": {
                        const { stt, users, key, management, ...restOldVal } =
                            oldVal;
                        const updateProgram = ProgramForm({
                            _id: key,
                            ...restOldVal,
                            ...programObject,
                            moneyCurrent: moneyCurrent,
                            moneyRate:
                                (moneyCurrent / programObject.moneyTotal) * 100,
                            management: [
                                ...management,
                                {
                                    admin_id: admin.admin_id,
                                    descriptionChange: `${keyForm}d by ${admin.name}.`,
                                    executionTime: moment().toISOString(),
                                },
                            ],
                        });

                        dispatch(reduxAction({ stt, updateProgram }));
                        return { updateProgram };
                    }

                    case "Delete": {
                        const { key } = oldVal;
                        dispatch(reduxAction(key));
                        return { deleteId: key };
                    }

                    default:
                        throw new Error();
                }
            })
            .then((result) => {
                switch (keyForm) {
                    case "Create": {
                        if (result.result === "err") return result;
                        else return dispatch(reduxAction(result.result));
                    }

                    case "Update": {
                        return RequestBE.UpdateCollection(
                            KEY,
                            result.updateProgram
                        );
                    }

                    case "Delete": {
                        return RequestBE.DeleteCollection(
                            KEY,
                            result.deleteId,
                            admin.admin_id
                        );
                    }

                    default:
                        throw new Error();
                }
            })
            .then((result) => messageToUser(keyForm, result))
            .catch((err) => console.log(err));
    }
);

export const RestAPIAuth = createAsyncThunk(
    "Thunk/login",
    async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const response = await RequestBE.PostLogIn(params);
        const sessionID = document.cookie.split("=")[1];
        const result = response.result;
        const { LogOut } = AuthDataSlice.actions;
        sessionStorage.setItem("SessionID", sessionID);
        messageToUser("Login", response);
        if (params) {
            const { password } = params;
            const { data } = result;
            const i = data.findIndex((u) => u._id === result.user_id);
            data[i].password = password;
        }
        if (result === "err" || !sessionID) {
            document.cookie = "SessionID=";
            sessionStorage.setItem("SessionID", "");
            dispatch(LogOut());
            return;
        }
        return result;
    }
);

export const OAuth2 = createAsyncThunk(
    "Thunk/OAuth2",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        const dispatch = thunkAPI.dispatch;
        const newWindow = window.open(
            "http://localhost:5000/auth/google",
            "_blank",
            "width=400,height=500"
        );
        let timer;

        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    dispatch(RestAPIAuth());
                    if (timer) return clearInterval(timer);
                }
            }, 500);
        }
    }
);

export const LogOutAuth = createAsyncThunk(
    "Thunk/logout",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        const dispatch = thunkAPI.dispatch;
        const response = await RequestBE.PostLogOut();
        const reduxAction = AuthDataSlice.actions.LogOut;
        document.cookie = "SessionID=";
        sessionStorage.setItem("SessionID", "");
        messageToUser("Logout", response);
        dispatch(reduxAction());
    }
);

export const UserCollections = createAsyncThunk(
    "Thunk/changeInUser",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        // Xử lý payload
        const KEY = "User";
        const { keyForm, data } = params;
        const { oldVal, values, admin } = data;
        const { imgAvatar, imgUpFile, ...restPostValues } = values;
        const userObject = UserForm(restPostValues);
        const dispatch = thunkAPI.dispatch;
        const reduxAction = AuthDataSlice.actions[keyForm + KEY];
        const handlePromise = Promise.resolve();
        const GoToMail = (message) => {
            setTimeout(() => {
                const redirect = window.confirm(message);
                if (redirect)
                    window.location.replace("https://mail.google.com");
            }, 1000);
        };
        handlePromise
            .then(() => {
                const hasFile = imgUpFile?.length > 0;
                const isNull = !imgAvatar;
                const isDelete = keyForm === "Delete";
                if (hasFile && !isDelete) {
                    const imgUrl = dispatch(
                        UploadImg({
                            keyForm: KEY,
                            data: { imgFiles: imgUpFile },
                        })
                    );
                    return imgUrl;
                } else if (isNull) {
                    return { payload: "asset/img/auto_insert_img.jpg" };
                } else {
                    return { payload: imgAvatar };
                }
            })
            .then((imgUrl) => {
                userObject.imgAvatar = imgUrl.payload;
                return;
            })
            .then(() => {
                switch (keyForm) {
                    case "Create": {
                        return RequestBE.CreateCollection(KEY, userObject);
                    }

                    case "Update": {
                        console.log("Update 1");
                        const { stt, key, _id, ...restOldVal } = oldVal;
                        const updateUser = UserForm({
                            _id: key || _id || admin.admin_id,
                            ...restOldVal,
                            ...userObject,
                        });
                        const userData = thunkAPI.getState().AuthData.data;
                        const i = userData.findIndex((u) => u._id === _id) + 1;

                        dispatch(reduxAction({ stt: stt || i, updateUser }));
                        return { updateUser };
                    }

                    case "Delete": {
                        const { key } = oldVal;
                        dispatch(reduxAction(key));
                        return { deleteId: key };
                    }

                    default:
                        throw new Error();
                }
            })
            .then((result) => {
                console.log("Update 2", result);
                switch (keyForm) {
                    case "Create": {
                        if (result.result === "err") {
                            return result;
                        } else if (!admin.admin_id) {
                            GoToMail(
                                "You need verify in your email!\nWe are going to redirect to your mail!"
                            );
                            return dispatch(reduxAction(result.result));
                        } else return dispatch(reduxAction(result.result));
                    }

                    case "Update": {
                        let hashPass;
                        if (admin.admin_id) {
                            hashPass = result.updateUser.password;
                        } else if (!oldVal._id) {
                            GoToMail(
                                "You need to go to your email!\nWe are going to redirect to your mail!"
                            );
                        }

                        return RequestBE.UpdateCollection(KEY, {
                            ...result.updateUser,
                            hashPass,
                        });
                    }

                    case "Delete": {
                        return RequestBE.DeleteCollection(
                            KEY,
                            result.deleteId,
                            admin.admin_id
                        );
                    }

                    default:
                        throw new Error();
                }
            })
            .then((result) => messageToUser(keyForm, result))
            .catch((err) => console.log(err));
    }
);

export const CreatePaypalOrder = createAsyncThunk(
    "Thunk/create-paypal-order",
    async (params, thunkAPI) => {
        const { donation } = params;
        return await RequestBE.PaymentOrder({ donation });
    }
);

export const CapturePaypalOrder = createAsyncThunk(
    "Thunk/capture-paypal-order",
    async (params, thunkAPI) => {
        const dispatch = thunkAPI.dispatch;
        const { data, donation } = params;
        const Donation = AuthDataSlice.actions.Donation;
        try {
            const approve = await RequestBE.PaymentCapture({
                orderId: data.orderID,
                donation: donation,
            });
            const { captureData, ...rest } = approve;

            dispatch(RestAPIShow());
            dispatch(Donation(rest));
            return message.success("Quyên góp thành công!");
        } catch (err) {
            console.log(err);
            return message.success("Quyên góp thất bại!");
        }
    }
);

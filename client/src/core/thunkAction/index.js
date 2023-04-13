import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import moment from "moment";

import RequestBE from "../../data";
import { ProgramForm, UserForm } from "../contructors";
import { AuthDataSlice } from "../slice/authData";
import { ShowDataSlice } from "../slice/showData";

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
        const handlePromise = new Promise((resolve, reject) => resolve());
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
                        return;
                }
            })
            .then((result) => {
                switch (keyForm) {
                    case "Create": {
                        return dispatch(reduxAction(result.result));
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
                        return;
                }
            })
            .catch((err) => console.log(err));
    }
);

export const RestAPIAuth = createAsyncThunk(
    "Thunk/login",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        const response = await RequestBE.PostLogIn(params);
        if (response.isLogin) message.success(response.message);
        else message.error(response.message);
        return response;
    }
);

export const UserCollections = createAsyncThunk(
    "Thunk/changeInUser",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        // Xử lý payload
        const { keyForm, data } = params;
        const { oldVal, values, admin } = data;
        const { imgAvatar, imgUpFile, ...restPostValues } = values;
        const KEY = "User";
        const userObject = UserForm(restPostValues);
        const dispatch = thunkAPI.dispatch;
        const reduxAction = AuthDataSlice.actions[keyForm + KEY];
        const handlePromise = new Promise((resolve, reject) => resolve());
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
                        const { stt, key, _id, ...restOldVal } = oldVal;
                        const updateUser = UserForm({
                            _id: key || _id,
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
                        return;
                }
            })
            .then((result) => {
                switch (keyForm) {
                    case "Create": {
                        return dispatch(reduxAction(result.result));
                    }

                    case "Update": {
                        return RequestBE.UpdateCollection(
                            KEY,
                            result.updateUser
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
                        return;
                }
            })
            .catch((err) => console.log(err));
    }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import moment from "moment";

import RequestBE from "../../data";
import { ProgramForm } from "../contructors";
import { ChangeAvatar } from "../slice/authData";
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
        const formData = new FormData();
        formData.append("fileName", `${keyForm}-${moment().valueOf()}`);
        formData.append("imgFile", data.imgFile);

        const response = await RequestBE.PostImg(formData);
        if (keyForm === "Avatar") {
            dispatch(ChangeAvatar({ user_id: data._id, imgAvatar: response }));
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
                if (hasFile) {
                    const isCreateKey = keyForm === "Create";
                    const imgUrl = dispatch(
                        UploadImg({
                            keyForm: KEY,
                            data: {
                                _id: isCreateKey ? keyForm : oldVal.key,
                                imgFile: imgUpFile[0],
                            },
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
                        return updateProgram;
                    }

                    case "Delete": {
                        const { key } = oldVal;
                        dispatch(reduxAction(key));
                        return key;
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
                        return RequestBE.UpdateCollection(KEY, result);
                    }

                    case "Delete": {
                        return RequestBE.DeleteCollection(
                            KEY,
                            result,
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

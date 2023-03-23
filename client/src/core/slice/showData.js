import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import moment from "moment";

import RequestBE from "../../data";
import { ProgramForm } from "../contructors";

const initialState = {
    // status: 'idle' || 'loading' ||  'error',
    organizations: [],
    programs: [],
    news: [],
};

const reducers = {
    CreateProgram: (state, action) => {
        // Xử lý payload
        const newProgram = action.payload;
        const progs = [...current(state).programs];
        progs.unshift(newProgram);
        // Tạo kết quả
        return { ...state, programs: progs }; // Thay đổi state
    },
    UpdateProgram: (state, action) => {
        // Xử lý payload
        const { stt, updateProgram } = action.payload;
        const progs = [...current(state).programs];
        progs[stt - 1] = updateProgram;
        // Tạo kết quả
        return { ...state, programs: progs }; // Thay đổi state
    },
    DeleteProgram: (state, action) => {
        // Xử lý payload
        const id = action.payload;
        const progs = [...current(state).programs.filter((p) => p._id !== id)];
        // Tạo kết quả
        return { ...state, programs: progs }; // Thay đổi state
    },
    Donation: (state, action) => {
        // Xử lý payload
        // const donat = action.payload;
        // console.log(donat);
    },
};

const extraReducers = (builder) => {
    // builder.addCase(FetchGetDatas.pending, (state, action) => state.loading = true);
    builder
        .addCase(RestAPIShow.fulfilled, (state, actions) => {
            state = actions.payload; // payload lấy dữ liệu từ return của createAsyncThunk/async function
            return state;
        })
        .addCase(RestAPIShow.rejected, () => console.log("RestAPI thất bại!"));
    // builder.addCase(ProgramCollections.fulfilled, () => { console.log('RestAPI thất bại!'); });
};

const RestAPIShow = createAsyncThunk(
    "ShowData/get",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        const response = await RequestBE.GetShowData();
        return response;
    }
);

const UploadImg = createAsyncThunk(
    "ShowData/postImg",
    async (params, thunkAPI) => {
        // console.log(params, thunkAPI);
        // const response = await RequestBE.PostImg(params);
        // return thunkAPI.dispatch(Donation(response));
    }
);

const ProgramCollections = createAsyncThunk(
    "ShowData/changeProgram",
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
                const isWrongFile = !imgUpFile || imgUpFile?.length === 0;
                if (isWrongFile)
                    return new Promise((resolve, reject) =>
                        resolve({ url: "auto_insert_img.png" })
                    );
                else return RequestBE.PostImg(imgUpFile);
            })
            .then((imgUrl) => {
                programObject.imgProgram = imgUrl.url;
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

export const ShowDataSlice = createSlice({
    name: "ShowData",
    initialState,
    reducers,
    extraReducers,
});

// Là một hàm hướng dẫn cho Hook 'useSelector' lấy giá trị state theo yêu cầu
const SelectData = (state) => state[ShowDataSlice.name];

// Custom hook selector to data
export const SelectDataState = () => useSelector(SelectData);

export const { DeleteProgram, UpdateProgram, Donation } = ShowDataSlice.actions;

export { RestAPIShow, UploadImg, ProgramCollections };

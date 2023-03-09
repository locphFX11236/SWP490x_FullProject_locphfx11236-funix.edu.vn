import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import moment from 'moment';

import RequestBE from '../../data';
import { ProgramForm } from "../contructors";

const initialState = {
    organizations: [],
    programs: [],
    news: [],
};

const reducers = {
    CreateProgram: (state, action) => {
        // Xử lý payload
        const { values, admin } = action.payload;
        const { imgProgram, moneyCurrent, moneyRate, imgUpFile, ...createValues } = values;
        const isWrongFile = (!imgUpFile || imgUpFile?.length === 0);
        const imgUrl = isWrongFile ? 'auto_insert_img.png' : RequestBE.PostImg(imgUpFile).url; // Post lấy url
        const newProgram = ProgramForm({
            _id: { $oid: moment().toISOString() },
            ...createValues,
            imgProgram: imgUrl,
            management: [{
                admin_id: admin.admin_id,
                descriptionChange: `Created by ${admin.name}.`,
                executionTime: moment().toISOString(),
            }],
        });
        // Xử lý yêu cầu
        const progs = [ ...current(state).programs ];
        progs.unshift(newProgram);
        // Tạo kết quả
        RequestBE.CreateCollection('program', newProgram ); // Gửi Post Backend
        return { ...state, programs: progs }; // Thay đổi state
    },
    UpdateProgram: (state, action) => {
        // Xử lý payload
        const { oldVal, newVal, admin } = action.payload;
        const { stt, users, key, management, ...restOldVal } = oldVal;
        const { imgUpFile, imgProgram, moneyCurrent, moneyTotal, ...restNewVal } = newVal;
        const isWrongFile = (!imgUpFile || imgUpFile?.length === 0);
        const imgUrl = isWrongFile ? imgProgram : RequestBE.PostImg(imgUpFile).url; // Post lấy url
        const updateProgram = ProgramForm({
            _id: { $oid: key },
            ...restOldVal,
            imgProgram: imgUrl,
            ...restNewVal,
            moneyTotal,
            moneyCurrent,
            moneyRate: (moneyCurrent/moneyTotal),
            management: [
                ...management,
                {
                    admin_id: admin.admin_id,
                    descriptionChange: `Updated by ${admin.name}.`,
                    executionTime: moment().toISOString(),
                }
            ],
        });
        // Xử lý yêu cầu
        const progs = [ ...current(state).programs ];
        progs[stt - 1] = updateProgram;
        // Tạo kết quả
        RequestBE.UpdateCollection('program', updateProgram); // Gửi Patch Backend
        return { ...state, programs: progs }; // Thay đổi state
    },
    DeleteProgram: (state, action) => {
        // Xử lý payload
        const id = action.payload;
        // Xử lý yêu cầu
        const progs = [ ...current(state).programs.filter(p => p._id.$oid !== id) ];
        // Tạo kết quả
        RequestBE.DeleteCollection('program', id); // Gửi Delete Backend
        return { ...state, programs: progs }; // Thay đổi state
    },
    Donation: (state, action) => {
        // Xử lý payload
        const donat = action.payload; console.log(donat);
    },
};

const extraReducers = (builder) => {
    // builder.addCase(FetchGetDatas.pending, (state: SerState) => state.loading = true);
    builder.addCase(RestAPIShow.fulfilled, (state, actions) => {
        state = actions.payload; // payload lấy dữ liệu từ return của createAsyncThunk/async function
        return state;
    })
    builder.addCase(RestAPIShow.rejected, () => { console.log('RestAPI thất bại!'); });
};

const RestAPIShow = createAsyncThunk('ShowData/get', async (params, thunkAPI) => {
    // console.log(params, thunkAPI);
    const response = await RequestBE.GetShowData();
    return response;
});

const ShowDataSlice = createSlice({
    name: 'ShowData',
    initialState,
    reducers,
    extraReducers
});

const ShowDataReducer = ShowDataSlice.reducer;

// Là một hàm hướng dẫn cho Hook 'useSelector' lấy giá trị state theo yêu cầu
const SelectData = (state) => state.DataState;

// Custom hook selector to data
export const SelectDataState = () => useSelector(SelectData);

export const { CreateProgram, DeleteProgram, UpdateProgram, Donation } = ShowDataSlice.actions;

export { RestAPIShow };

export default ShowDataReducer;
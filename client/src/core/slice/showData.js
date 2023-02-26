import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
        const { imgProgram, moneyCurrent, moneyRate, imgUpFile, ...createValues } = action.payload;
        const imgUrl = RequestBE.PostImg(imgUpFile).url; // Post lấy url
        const newProgram = ProgramForm({
            ...createValues,
            imgProgram: imgUrl
        });
        state.programs.unshift({
            _id: { $oid: moment().toISOString() },
            ...newProgram
        }); // Thay đổi state
        RequestBE.CreateCollection('program', newProgram ); // Gửi Post Backend
        return;
    },
    UpdateProgram: (state, action) => {
        const { oldVal, newVal } = action.payload;
        const { stt, users, key, ...restOldVal } = oldVal;
        const { imgUpFile, imgProgram, ...restNewVal } = newVal;
        const imgUrl = !(imgUpFile) ? RequestBE.PostImg(imgUpFile).url : imgProgram; // Post lấy url
        const updateProgram = ProgramForm({
            ...restOldVal,
            ...restNewVal,
            _id: { $oid: key },
            imgProgram: imgUrl
        });
        const progs = [ ...state.programs ];
        progs[stt - 1] = updateProgram;
        RequestBE.UpdateCollection('program', updateProgram); // Gửi Patch Backend
        return { ...state, programs: progs }; // Thay đổi state
    },
    DeleteProgram: (state, action) => {
        const id = action.payload;
        const progs = state.programs.filter(p => p._id.$oid !== id);
        RequestBE.DeleteCollection('program', id); // Gửi Delete Backend
        return { ...state, programs: progs }; // Thay đổi state
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

export const { CreateProgram, DeleteProgram, UpdateProgram } = ShowDataSlice.actions;

export { RestAPIShow };

export default ShowDataReducer;
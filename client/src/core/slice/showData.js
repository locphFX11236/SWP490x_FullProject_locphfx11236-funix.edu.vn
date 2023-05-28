import { useSelector } from "react-redux";
import { createSlice, current } from "@reduxjs/toolkit";

import { RestAPIShow } from "../thunkAction";

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

import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';

import RequestBE from '../../data';

const initialState = {
    organizations: [],
    programs: [],
    news: [],
};

const reducers = {
    Action: (state, action) => { return; },
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

export const { Action } = ShowDataSlice.actions;

export { RestAPIShow };

export default ShowDataReducer;
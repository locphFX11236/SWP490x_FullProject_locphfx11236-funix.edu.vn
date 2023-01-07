import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';

import RequestBE from '../../data';

const initialState = {
    user_id: '',
    isAdmin: false,
    isLogin: false,
    message: '',
    data: []
};

const reducers = {
    Action: (state, action) => { return; },
};

const extraReducers = (builder) => {
    // builder.addCase(FetchGetDatas.pending, (state: SerState) => state.loading = true);
    builder.addCase(RestAPIAuth.fulfilled, (state, actions) => {
        state = actions.payload; // payload lấy dữ liệu từ return của createAsyncThunk/async function
        return state;
    })
    builder.addCase(RestAPIAuth.rejected, () => { console.log('RestAPI thất bại!'); });
};

const RestAPIAuth = createAsyncThunk('AuthData/get', async (params, thunkAPI) => {
    // console.log(params, thunkAPI);
    const response = await RequestBE.GetAuthData(params);
    return response;
});

const AuthDataSlice = createSlice({
    name: 'AuthData',
    initialState,
    reducers,
    extraReducers
});

const AuthDataReducer = AuthDataSlice.reducer;

// Là một hàm hướng dẫn cho Hook 'useSelector' lấy giá trị state theo yêu cầu
const SelectAuth = (state) => state.AuthState;

// Custom hook selector to data
export const SelectAuthState = () => useSelector(SelectAuth);

export const { Action } = AuthDataSlice.actions;

export { RestAPIAuth };

export default AuthDataReducer;
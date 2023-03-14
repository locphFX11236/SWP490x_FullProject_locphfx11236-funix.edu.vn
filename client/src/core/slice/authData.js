import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { message } from "antd";
import moment from 'moment';

import RequestBE from '../../data';
import { UserForm } from "../contructors";

const initialState = {
    user_id: '',
    isAdmin: false,
    isLogin: false,
    message: '',
    data: []
};

const reducers = {
    LogOut: () => {
        RequestBE.PostLogOut();
        message.success('You logged out!');
        return { ...initialState, message: 'You logged out!' };
    },
    CreateUser: (state, action) => {
        // Xử lý payload
        const { imgAvatar, imgUpFile, ...createValues} = action.payload;
        const isWrongFile = (!imgUpFile || imgUpFile?.length === 0);
        const imgUrl = isWrongFile ? '' : RequestBE.PostImg(imgUpFile).url; // Post lấy url
        const newUser = UserForm({
            _id: moment().toISOString(),
            ...createValues,
            imgAvatar: imgUrl,
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
        });
        // Xử lý yêu cầu
        const users = [ ...current(state).data ];
        users.unshift(newUser);
        // Tạo kết quả
        RequestBE.CreateCollection('user', newUser); // Gửi Post Backend
        return { ...state, data: users }; // Thay đổi state
    },
    UpdateUser: (state, action) => {
        // Xử lý payload
        const { oldVal, newVal } = action.payload;
        const { stt, key, ...restOldVal } = oldVal;
        const { imgUpFile, imgAvatar, ...restNewVal } = newVal;
        const isWrongFile = (!imgUpFile || imgUpFile?.length === 0);
        const imgUrl = isWrongFile ? imgAvatar : RequestBE.PostImg(imgUpFile).url; // Post lấy url
        const updateUser = UserForm({
            _id: key,
            ...restOldVal,
            imgAvatar: imgUrl,
            ...restNewVal,
            updatedAt: moment().toISOString(),
        });
        // Xử lý yêu cầu
        const users = [ ...current(state).data ];
        users[stt - 1] = updateUser;
        // Tạo kết quả
        RequestBE.UpdateCollection('user', updateUser); // Gửi Patch Backend
        return { ...state, data: users }; // Thay đổi state
    },
    DeleteUser: (state, action) => {
        // Xử lý payload
        const id = action.payload;
        // Xử lý yêu cầu
        const users = [ ...current(state).data.filter(u => u._id.$oid !== id) ];
        // Tạo kết quả
        RequestBE.DeleteCollection('user', id); // Gửi Delete Backend
        return { ...state, data: users }; // Thay đổi state
    },
    ChangeAvatar: (state, action) => {
        // Xử lý payload
        const { user_id, imgAvatar } = action.payload;
        const imgUrl = RequestBE.PostImg(imgAvatar).url;
        const index = state.data.findIndex(d => d._id.$oid === user_id);
        // Xử lý yêu cầu
        const users = [ ...current(state).data ];
        const updateUser = { ...users[index], imgAvatar: imgUrl };
        users[index] = updateUser;
        // Tạo kết quả
        RequestBE.UpdateCollection('user', updateUser); // Gửi Patch Backend
        return { ...state, data: users }; // Thay đổi state
    },
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
    const response = await RequestBE.PostLogIn(params);
    if (response.isLogin) message.success(response.message);
    else message.error(response.message);
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

export const { LogOut, CreateUser, DeleteUser, UpdateUser, ChangeAvatar } = AuthDataSlice.actions;

export { RestAPIAuth };

export default AuthDataReducer;
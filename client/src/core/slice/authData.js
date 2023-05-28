import { useSelector } from "react-redux";
import { createSlice, current } from "@reduxjs/toolkit";

import { RestAPIAuth } from "../thunkAction";

const initialState = {
    user_id: "",
    isAdmin: false,
    isLogin: false,
    message: "",
    data: [],
};

const reducers = {
    LogOut: (state, action) => ({ ...initialState, message: action.payload }),
    CreateUser: (state, action) => {
        // Xử lý payload
        const newUser = action.payload;
        const users = [...current(state).data];
        users.unshift(newUser);
        // Tạo kết quả
        return { ...state, data: users }; // Thay đổi state
    },
    UpdateUser: (state, action) => {
        // Xử lý payload
        const { stt, updateUser } = action.payload;
        const users = [...current(state).data];
        users[stt - 1] = updateUser;
        // Tạo kết quả
        return { ...state, data: users }; // Thay đổi state
    },
    DeleteUser: (state, action) => {
        // Xử lý payload
        const id = action.payload;
        const users = [...current(state).data.filter((u) => u._id !== id)];
        // Tạo kết quả
        return { ...state, data: users }; // Thay đổi state
    },
};

const extraReducers = (builder) => {
    // builder.addCase(FetchGetDatas.pending, (state: SerState) => state.loading = true);
    builder.addCase(RestAPIAuth.fulfilled, (state, actions) => {
        const response = actions.payload; // payload lấy dữ liệu từ return của createAsyncThunk/async function
        return response;
    });
    builder.addCase(RestAPIAuth.rejected, () => {
        console.log("RestAPI thất bại!");
    });
};

export const AuthDataSlice = createSlice({
    name: "AuthData",
    initialState,
    reducers,
    extraReducers,
});

// const AuthDataReducer = AuthDataSlice.reducer;

// Là một hàm hướng dẫn cho Hook 'useSelector' lấy giá trị state theo yêu cầu
const SelectAuth = (state) => state[AuthDataSlice.name];

// Custom hook selector to data
export const SelectAuthState = () => useSelector(SelectAuth);

import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

import { RestAPIAuth } from "../thunkAction";

const initialState = {
    user_id: "",
    isAdmin: false,
    isLogin: false,
    data: [],
};

const reducers = {
    CreateUser: (state, action) => {
        // Xử lý payload
        const newUser = action.payload;
        const users = [...state.data];
        users.unshift(newUser);
        // Tạo kết quả
        return { ...state, data: users }; // Thay đổi state
    },
    UpdateUser: (state, action) => {
        // Xử lý payload
        const { stt, updateUser } = action.payload;
        const users = [...state.data];
        users[stt - 1] = updateUser;
        // Tạo kết quả
        return { ...state, data: users }; // Thay đổi state
    },
    DeleteUser: (state, action) => {
        // Xử lý payload
        const id = action.payload;
        const users = [...state.data.filter((u) => u._id !== id)];
        // Tạo kết quả
        return { ...state, data: users }; // Thay đổi state
    },
    Donation: (state, action) => {
        // Xử lý payload
        const { history, user_id } = action.payload;
        const index = state.data.findIndex((u) => u._id === user_id);
        // Tạo kết quả
        state.data[index].history.push(history);
        return state;
    },
    LogOut: () => initialState,
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

import { configureStore } from '@reduxjs/toolkit';
import AuthDataReducer from './slice/authData';
import ShowDataReducer from './slice/showData';

export const store = configureStore({
    reducer: {
        DataState: ShowDataReducer,
        AuthState: AuthDataReducer
    },
});
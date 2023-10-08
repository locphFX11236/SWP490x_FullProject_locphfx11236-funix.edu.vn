import { memo } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { AuthDataSlice, ShowDataSlice } from "./slice";

const store = configureStore({
    reducer: {
        [ShowDataSlice.name]: ShowDataSlice.reducer,
        [AuthDataSlice.name]: AuthDataSlice.reducer,
    },
});

const StoreProvider = ({ children }) => (
    <Provider store={store} children={children} />
);

export default memo(StoreProvider);

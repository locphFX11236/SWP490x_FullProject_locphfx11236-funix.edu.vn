import { configureStore } from "@reduxjs/toolkit";

import { AuthDataSlice } from "./slice/authData";
import { ShowDataSlice } from "./slice/showData";

export const store = configureStore({
    reducer: {
        [ShowDataSlice.name]: ShowDataSlice.reducer,
        [AuthDataSlice.name]: AuthDataSlice.reducer,
    },
});

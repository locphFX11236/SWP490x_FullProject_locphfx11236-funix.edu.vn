import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { AuthDataSlice } from "./slice/authData";
import { ShowDataSlice } from "./slice/showData";

const store = configureStore({
    reducer: {
        [ShowDataSlice.name]: ShowDataSlice.reducer,
        [AuthDataSlice.name]: AuthDataSlice.reducer,
    },
});

const StoreProvider = ({ children }) => (
    <Provider store={store} children={children} />
);

export default StoreProvider;

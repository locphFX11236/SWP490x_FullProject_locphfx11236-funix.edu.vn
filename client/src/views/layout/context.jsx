import { BrowserRouter } from "react-router-dom";

import StoreProvider from "../../core/store";

const ContextProvider = ({ children }) => (
    <StoreProvider>
        <BrowserRouter>{children}</BrowserRouter>
    </StoreProvider>
);

export default ContextProvider;

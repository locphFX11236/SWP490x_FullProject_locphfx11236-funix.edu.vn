import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import MainRouter from "./routes";
import { ReduxStoreProvider } from "./core";

const App = () => (
    <ReduxStoreProvider>
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
    </ReduxStoreProvider>
);

export default App;

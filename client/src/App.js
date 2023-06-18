import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css";
import ContextProvider from "./views/layout/context";
import MainRouter from "./routes";
import * as MainView from "./views";

const App = () => (
    <ContextProvider>
        <MainRouter {...MainView} />
    </ContextProvider>
);

export default App;

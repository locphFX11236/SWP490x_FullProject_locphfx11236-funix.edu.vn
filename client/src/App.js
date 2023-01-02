import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MainView from './views';

const App = () => {
    return (
        // <Provider store={store}>
            <BrowserRouter>
                <MainView />
            </BrowserRouter>
        // </Provider>
    );
}

export default App;

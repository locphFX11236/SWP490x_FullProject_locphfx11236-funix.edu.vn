import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

import { store } from './core/store';
import * as MainView from './views';
import MainRouter from './routes';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <MainRouter { ...MainView } />
        </BrowserRouter>
    </Provider>
);

export default App;
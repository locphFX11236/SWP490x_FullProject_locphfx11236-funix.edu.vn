import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MainRoute from './routes';
import MainView from './views';

const App = () => {
  return (
    // <Provider store={store}>
    //   <BrowserRouter>
        <MainView>
          <MainRoute/>
        </MainView>
    //   </BrowserRouter>
    // </Provider>
  );
}

export default App;

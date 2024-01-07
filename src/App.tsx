import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import './App.css';
import AuthProvider from './hoc/context/AuthContext/AuthProvider';
import AuthInitializer from './hoc/context/AuthContext/AuthInitializer';
import RegionProvider from './hoc/context/RegionContext/RegionProvider';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <AuthProvider>
          <RegionProvider>
            <RouterProvider router={router} />
          </RegionProvider>
        </AuthProvider>
      </AuthInitializer>
    </Provider>
  );
}

export default App;

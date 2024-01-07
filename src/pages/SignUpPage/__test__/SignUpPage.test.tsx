import { render } from '@testing-library/react';
import SignUpPage from '../SignUpPage';
import { Provider } from 'react-redux';
import RegionProvider from '../../../hoc/context/RegionContext/RegionProvider';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../../../hoc/context/AuthContext/AuthProvider';

describe('SignUpPage component', () => {
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Provider store={store}>
            <RegionProvider>
              <SignUpPage />
            </RegionProvider>
          </Provider>
        </AuthProvider>
      </MemoryRouter>
    );
  });
});

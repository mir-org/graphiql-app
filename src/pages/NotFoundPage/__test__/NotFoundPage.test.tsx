import { render } from '@testing-library/react';
import NotFoundPage from '../NotFoundPage';
import { Provider } from 'react-redux';
import RegionProvider from '../../../hoc/context/RegionContext/RegionProvider';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundPage component', () => {
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <RegionProvider>
            <NotFoundPage />
          </RegionProvider>
        </Provider>
      </MemoryRouter>
    );
  });
});

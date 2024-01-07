import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import MainPage from '../MainPage';
import userEvent from '@testing-library/user-event';
import { BASE_API_LINK } from '../../../shared/constants';
import RegionProvider from '../../../hoc/context/RegionContext/RegionProvider';
import * as apiHooks from '../../../redux/slices/GraphQLSlice';

describe('MainPage component tests', () => {
  it('MainPage renders without errors', () => {
    render(
      <Provider store={store}>
        <RegionProvider>
          <MainPage />
        </RegionProvider>
      </Provider>
    );
  });
  it(`fetchSchema function is called after changing api url`, async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(apiHooks, 'fetchSchema');
    const apiUrl = 'no-sense-message';
    render(
      <Provider store={store}>
        <RegionProvider>
          <MainPage />
        </RegionProvider>
      </Provider>
    );
    const apiLinkInput = screen.getByDisplayValue(BASE_API_LINK);
    await user.clear(apiLinkInput);
    await user.type(apiLinkInput, apiUrl);
    await user.click(screen.getByRole('button', { name: 'Change URL' }));
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('fetchSchema function is called after MainPage render automatically', async () => {
    const spy = vi.spyOn(apiHooks, 'fetchSchema');
    render(
      <Provider store={store}>
        <RegionProvider>
          <MainPage />
        </RegionProvider>
      </Provider>
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

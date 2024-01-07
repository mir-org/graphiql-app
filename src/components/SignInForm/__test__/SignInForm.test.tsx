import { screen } from '@testing-library/react';
import SignInForm from '../SignInForm';
import { renderWithRouter } from '../../../test/utils';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

describe('SignInForm tests', () => {
  it('SignInForm renders without errors', () => {
    renderWithRouter(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    );
  });
  it('Submit button is disabled by default', async () => {
    renderWithRouter(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

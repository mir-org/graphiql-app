import { render, screen } from '@testing-library/react';
import SignUpForm from '../SignUpForm';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

describe('SignUpForm tests', () => {
  it('SignUpForm renders without errors', () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
  });
  it('Submit button is disabled by default', async () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

import { render, screen } from '@testing-library/react';
import PasswordInput from '../InputPassword';
import RegionProvider from '../../../../hoc/context/RegionContext/RegionProvider';
import { LOCALE_DATA } from '../../../../locales/constants/constants';
import { INITIAL_REGION } from '../../../../shared/constants';
import userEvent from '@testing-library/user-event';

describe('PasswordInput tests', () => {
  it('PasswordInput renders without errors', () => {
    const handleChange = vi.fn();
    render(
      <RegionProvider>
        <PasswordInput onChange={handleChange} value="" />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.password)
    ).toBeInTheDocument();
  });
  it('PasswordInput renders with passed value', () => {
    const handleChange = vi.fn();
    const inputValue = 'test';
    render(
      <RegionProvider>
        <PasswordInput onChange={handleChange} value={inputValue} />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.password)
    ).toHaveAttribute('value', inputValue);
  });
  it('PasswordInput calls onChange function, when user types', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RegionProvider>
        <PasswordInput onChange={handleChange} value="" />
      </RegionProvider>
    );
    await user.type(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.password),
      'test'
    );
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
  it('PasswordInput component includes input with password type', async () => {
    const handleChange = vi.fn();
    render(
      <RegionProvider>
        <PasswordInput onChange={handleChange} value="" />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.password)
    ).toHaveAttribute('type', 'password');
  });
});

import { render, screen } from '@testing-library/react';
import InputEmail from '../InputEmail';
import RegionProvider from '../../../../hoc/context/RegionContext/RegionProvider';
import { LOCALE_DATA } from '../../../../locales/constants/constants';
import { INITIAL_REGION } from '../../../../shared/constants';
import userEvent from '@testing-library/user-event';

describe('InputEmail tests', () => {
  it('InputEmail renders without errors', () => {
    const handleChange = vi.fn();
    render(
      <RegionProvider>
        <InputEmail onChange={handleChange} value="" />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.email)
    ).toBeInTheDocument();
  });
  it('InputEmail renders with passed value', () => {
    const handleChange = vi.fn();
    const inputValue = 'test';
    render(
      <RegionProvider>
        <InputEmail onChange={handleChange} value={inputValue} />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.email)
    ).toHaveAttribute('value', inputValue);
  });
  it('InputEmail calls onChange function, when user types', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RegionProvider>
        <InputEmail onChange={handleChange} value="" />
      </RegionProvider>
    );
    await user.type(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.email),
      'test'
    );
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
  it('InputEmail component includes input with email type', async () => {
    const handleChange = vi.fn();
    render(
      <RegionProvider>
        <InputEmail onChange={handleChange} value="" />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.email)
    ).toHaveAttribute('type', 'email');
  });
});

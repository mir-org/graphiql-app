import { render, screen } from '@testing-library/react';
import InputName from '../InputName';
import RegionProvider from '../../../../hoc/context/RegionContext/RegionProvider';
import { LOCALE_DATA } from '../../../../locales/constants/constants';
import { INITIAL_REGION } from '../../../../shared/constants';
import userEvent from '@testing-library/user-event';

describe('InputName tests', () => {
  it('InputName renders without errors', () => {
    const handleChange = vi.fn();
    render(
      <RegionProvider>
        <InputName onChange={handleChange} value="" />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.name)
    ).toBeInTheDocument();
  });
  it('InputName renders with passed value', () => {
    const handleChange = vi.fn();
    const inputValue = 'test';
    render(
      <RegionProvider>
        <InputName onChange={handleChange} value={inputValue} />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.name)
    ).toHaveAttribute('value', inputValue);
  });
  it('InputName calls onChange function, when user types', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RegionProvider>
        <InputName onChange={handleChange} value="" />
      </RegionProvider>
    );
    await user.type(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.name),
      'test'
    );
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
  it('InputName component includes input with text type', async () => {
    const handleChange = vi.fn();
    render(
      <RegionProvider>
        <InputName onChange={handleChange} value="" />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(LOCALE_DATA[INITIAL_REGION].form.input.name)
    ).toHaveAttribute('type', 'text');
  });
});

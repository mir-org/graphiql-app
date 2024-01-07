import { render, screen } from '@testing-library/react';
import ApiLinkForm from '../ApiLinkForm';
import RegionProvider from '../../../../hoc/context/RegionContext/RegionProvider';
import { LOCALE_DATA } from '../../../../locales/constants/constants';
import { INITIAL_REGION } from '../../../../shared/constants';
import userEvent from '@testing-library/user-event';

describe('ApiLinkForm tests', () => {
  it('ApiLinkForm component renders without errors', () => {
    const handleSubmit = vi.fn();
    render(
      <RegionProvider>
        <ApiLinkForm submitHandler={handleSubmit} value="" />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(
        LOCALE_DATA[INITIAL_REGION].mainPage.apiLinkForm.label
      )
    ).toBeInTheDocument();
  });
  it('ApiLinkForm component renders with passed value', () => {
    const handleSubmit = vi.fn();
    const inputValue = 'test';
    render(
      <RegionProvider>
        <ApiLinkForm submitHandler={handleSubmit} value={inputValue} />
      </RegionProvider>
    );
    expect(
      screen.getByLabelText(
        LOCALE_DATA[INITIAL_REGION].mainPage.apiLinkForm.label
      )
    ).toHaveAttribute('value', inputValue);
  });
  it('ApiLinkForm calls handleSubmit function, when user submits form', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(
      <RegionProvider>
        <ApiLinkForm submitHandler={handleSubmit} value="" />
      </RegionProvider>
    );
    await user.click(
      screen.getByRole('button', {
        name: LOCALE_DATA[INITIAL_REGION].mainPage.apiLinkForm.changeApiBtn,
      })
    );
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});

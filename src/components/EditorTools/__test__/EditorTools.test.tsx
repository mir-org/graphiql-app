import { screen } from '@testing-library/react';
import EditorTools from '../EditorTools';
import { renderWithProvider } from '../../../test/utils';
import userEvent from '@testing-library/user-event';
import * as apiHooks from '../../../redux/slices/GraphQLSlice';
import RegionProvider from '../../../hoc/context/RegionContext/RegionProvider';

describe('EditorTools component tests', () => {
  it('EditorTools renders without errors', () => {
    renderWithProvider(
      <RegionProvider>
        <EditorTools />
      </RegionProvider>
    );
  });
  it('Typing inside Headers tab input calls correct redux reducer', async () => {
    const headersContent = 'test-headers';

    const user = userEvent.setup();
    const spy = vi.spyOn(apiHooks, 'setHeaders');

    renderWithProvider(
      <RegionProvider>
        <EditorTools />
      </RegionProvider>
    );
    await user.click(screen.getByText('Headers'));
    await user.type(screen.getByRole('textbox'), headersContent);
    expect(spy).toHaveBeenCalledTimes(headersContent.length);
    expect(screen.getByDisplayValue(headersContent)).toBeInTheDocument();
  });
  it('Typing inside Variables tab input calls correct redux reducer', async () => {
    const variablesContent = 'test-variables';

    const user = userEvent.setup();
    const spy = vi.spyOn(apiHooks, 'setVariables');

    renderWithProvider(
      <RegionProvider>
        <EditorTools />
      </RegionProvider>
    );
    await user.click(screen.getByText('Variables'));
    await user.type(screen.getByRole('textbox'), variablesContent);
    expect(spy).toHaveBeenCalledTimes(variablesContent.length);
    expect(screen.getByDisplayValue(variablesContent)).toBeInTheDocument();
  });
});

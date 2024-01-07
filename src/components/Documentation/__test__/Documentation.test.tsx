import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../../../test/utils';
import Documentation from '../Documentation';
import { screen } from '@testing-library/react';

describe('Documentation component tests', () => {
  it('Documentation component renders without errors', () => {
    renderWithProvider(<Documentation />);
  });
  it('content is hidden by default', async () => {
    renderWithProvider(<Documentation />);
    expect(screen.queryByRole('textbox')).toBeNull();
  });
  it('click on button toggle content vision', async () => {
    const user = userEvent.setup();
    renderWithProvider(<Documentation />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

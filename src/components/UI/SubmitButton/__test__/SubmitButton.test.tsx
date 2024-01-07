import { screen, render } from '@testing-library/react';
import SubmitButton from '../SubmitButton';

describe('Test SubmitButton component', () => {
  it('SubmitButton has submit type', () => {
    render(<SubmitButton text="Send" disabled={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
  it('SubmitButton has passed text', () => {
    render(<SubmitButton text="Send" disabled={true} />);
    expect(screen.getByRole('button')).toHaveTextContent('Send');
  });
});

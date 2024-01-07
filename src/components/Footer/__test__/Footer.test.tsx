import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer component tests', () => {
  it('Footer component renders without error', () => {
    render(<Footer>test-child</Footer>);
  });
  it('Footer component renders with correct children', () => {
    const childText = 'test-child';
    render(<Footer>{childText}</Footer>);
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});

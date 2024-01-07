import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header component tests', () => {
  it('Header component renders without error', () => {
    render(<Header>test-child</Header>);
  });
  it('Header component renders with correct children', () => {
    const childText = 'test-child';
    render(<Header>{childText}</Header>);
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});

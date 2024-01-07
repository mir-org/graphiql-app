import { render } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('should render without errors', () => {
    render(<App />);
  });
});

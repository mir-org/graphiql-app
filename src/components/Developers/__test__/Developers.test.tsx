import { render } from '@testing-library/react';
import { Developers } from '../Developers';

describe('DeveloperCard component tests', () => {
  it('component renders without errors', () => {
    render(<Developers />);
  });
});

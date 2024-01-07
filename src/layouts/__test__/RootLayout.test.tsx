import { render } from '@testing-library/react';
import RootLayout from '../RootLayout';
import RegionProvider from '../../hoc/context/RegionContext/RegionProvider';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../../hoc/context/AuthContext/AuthProvider';

describe('RootLayout component tests', () => {
  it('component renders without errors', () => {
    render(
      <MemoryRouter>
        <RegionProvider>
          <AuthProvider>
            <RootLayout />
          </AuthProvider>
        </RegionProvider>
      </MemoryRouter>
    );
  });
});

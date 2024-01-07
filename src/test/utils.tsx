import { render, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import graphQLReducer from '../redux/slices/GraphQLSlice';

export const renderWithProvider = (ui: ReactNode): RenderResult => {
  const store = configureStore({
    reducer: {
      graphQL: graphQLReducer,
    },
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

export const renderWithRouter = (
  element: ReactNode,
  path = '/'
): RenderResult => {
  const router = createMemoryRouter([{ path, element }]);
  return render(<RouterProvider router={router} />);
};

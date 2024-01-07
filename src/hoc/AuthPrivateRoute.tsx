import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext/AuthContext';
import { IAuthContext, IProps } from '../shared/types';

function AuthPrivateRoute({ children }: IProps) {
  const authContext = useContext<IAuthContext | null>(AuthContext);
  const { user } = authContext as IAuthContext;

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default AuthPrivateRoute;

import { createContext } from 'react';
import { IAuthContext } from '../../../shared/types';

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;

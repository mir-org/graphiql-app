import { useContext } from 'react';
import AuthContext from '../hoc/context/AuthContext/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;

import { useEffect } from 'react';
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import app from '../../../firebase';
import { IProps } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../hook/useRedux';
import { setError } from '../../../redux/slices/GraphQLSlice';

const AuthInitializer = ({ children }: IProps) => {
  const auth = getAuth(app);
  const { errors } = useAppSelector((store) => store.graphQL);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        if (error instanceof Error) {
          const err = { id: Date.now(), message: error.message };
          dispatch(setError([...errors, err]));
        } else {
          const err = { id: Date.now(), message: 'Auth: something went wrong' };
          dispatch(setError([...errors, err]));
        }
      }
    };
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return children;
};

export default AuthInitializer;

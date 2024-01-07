import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { setError } from '../redux/slices/GraphQLSlice';

const useErrorToastClose = () => {
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((store) => store.graphQL);
  return (errorId: number) =>
    dispatch(setError(errors.filter((error) => error.id !== errorId)));
};

export default useErrorToastClose;

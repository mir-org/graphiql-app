import { useContext, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AuthContext from '../../hoc/context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IAuthContext } from '../../shared/types';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import classes from './SignUpPage.module.css';

function SignUpPage() {
  const region = useRegion();
  const authContext = useContext<IAuthContext | null>(AuthContext);
  const { user, loading } = authContext as IAuthContext;
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);
  if (loading) {
    return <div className={classes.loader}></div>;
  }
  return (
    <div className={classes.wrapper}>
      <h1>{region && LOCALE_DATA[region.region].signUpPage.text.signUp}</h1>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;

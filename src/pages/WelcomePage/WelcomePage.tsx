import { Link } from 'react-router-dom';
import classes from './WelcomePage.module.css';
import { useContext } from 'react';
import AuthContext from '../../hoc/context/AuthContext/AuthContext';
import { IAuthContext } from '../../shared/types';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import { Developers } from '../../components/Developers/Developers';
import Loader from '../../components/Loader/Loader';
import { PrimaryButton } from '../../components/UI/PrimaryButton/PrimaryButton';
import CourseInfo from '../../components/CourseInfo/CourseInfo';

function WelcomePage() {
  const region = useRegion();
  const authContext = useContext<IAuthContext | null>(AuthContext);
  const { user, loading } = authContext as IAuthContext;
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.list}>
        {user ? (
          <div className={classes.listElement}>
            <PrimaryButton>
              <Link to="/main" className={classes.link}>
                {region && LOCALE_DATA[region.region].welcomePage.link.mainPage}
              </Link>
            </PrimaryButton>
          </div>
        ) : (
          <>
            <div className={classes.listElement}>
              <PrimaryButton>
                <Link to="/sign-in" className={classes.link}>
                  {region && LOCALE_DATA[region.region].welcomePage.link.signIn}
                </Link>
              </PrimaryButton>
            </div>
            <div className={classes.listElement}>
              <PrimaryButton>
                <Link to="/sign-up" className={classes.link}>
                  {region && LOCALE_DATA[region.region].welcomePage.link.signUp}
                </Link>
              </PrimaryButton>
            </div>
          </>
        )}
      </div>
      <CourseInfo />
      <Developers />
    </div>
  );
}

export default WelcomePage;

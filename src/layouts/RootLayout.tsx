import { NavLink, Outlet } from 'react-router-dom';
import classes from './RootLayout.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { logout } from '../firebase';
import useRegion from '../hook/useRegion';
import { LOCALE_DATA, REGIONS } from '../locales/constants/constants';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { IAuthContext } from '../shared/types';
import AuthContext from '../hoc/context/AuthContext/AuthContext';
import { useContext } from 'react';
import { PrimaryButton } from '../components/UI/PrimaryButton/PrimaryButton';

function RootLayout() {
  const region = useRegion();
  const authContext = useContext<IAuthContext | null>(AuthContext);
  const { user } = authContext as IAuthContext;

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (Object.keys(REGIONS).includes(value)) {
      region?.setRegion(value);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Header>
        <NavLink to="/" className={classes.link}>
          {region && LOCALE_DATA[region.region].header.link.welcome}
        </NavLink>
        {user ? (
          <PrimaryButton onClick={logout}>
            {region && LOCALE_DATA[region.region].header.link.signOut}
          </PrimaryButton>
        ) : null}
        <select onChange={onSelectChange}>
          {Object.keys(REGIONS).map((key) => {
            return (
              <option key={key} value={key}>
                {REGIONS[key]}
              </option>
            );
          })}
        </select>
      </Header>
      <main className={classes.main}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default RootLayout;

import { Link } from 'react-router-dom';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import image from '../../assets/error-404.png';
import classes from './NotFoundPage.module.css';

function NotFoundPage() {
  const region = useRegion();

  return (
    <div className={classes.notFound}>
      <img className={classes.image} src={image} alt="not-found-image" />
      <div className={classes.notFoundContent}>
        <h2>{region && LOCALE_DATA[region.region].notFoundPage.Error}</h2>
        <h3>
          {region && LOCALE_DATA[region.region].notFoundPage.PageNotFound}
        </h3>
        <h4>
          {region && LOCALE_DATA[region.region].notFoundPage.brokeSomething}
        </h4>
        <h5>{region && LOCALE_DATA[region.region].notFoundPage.orU}</h5>
        <Link className={classes.btn} to={'/'}>
          {region && LOCALE_DATA[region.region].notFoundPage.BackToMain}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

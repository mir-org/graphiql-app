import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import styles from './CourseInfo.module.css';

function CourseInfo() {
  const region = useRegion();

  return (
    <div className={styles.text}>
      {(region && LOCALE_DATA[region.region].courseInfo) ?? ''}
    </div>
  );
}

export default CourseInfo;

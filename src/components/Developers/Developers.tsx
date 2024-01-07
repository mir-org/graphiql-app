import classes from './Developers.module.css';
import { DeveloperCard } from '../DeveloperCard/DeveloperCard';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import ilyaPhoto from '../../assets/ilya-photo.jpg';
import vladPhoto from '../../assets/vlad-photo.jpg';
import miraPhoto from '../../assets/mira-photo.jpg';

export function Developers() {
  const region = useRegion();
  const developersData =
    (region && LOCALE_DATA[region.region].developers) ?? [];
  const developersArray = Object.values(developersData);

  function getImageLink(firstName: string): string {
    switch (firstName.toLowerCase()) {
      case 'ilya':
      case 'илья':
        return ilyaPhoto;
      case 'vladislav':
      case 'владислав':
        return vladPhoto;
      case 'miroslav':
      case 'мирослав':
        return miraPhoto;
      default:
        return '';
    }
  }

  return (
    <div className={classes.developers}>
      {developersArray.map((elem, index) => (
        <DeveloperCard
          data={{
            ...elem,
            imgLink: getImageLink(elem.firstName),
          }}
          key={index}
        />
      ))}
    </div>
  );
}

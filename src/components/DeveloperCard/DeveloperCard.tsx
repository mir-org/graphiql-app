import classes from './DeveloperCard.module.css';
import { Developer } from '../../shared/types';
import { GitHubLink } from '../UI/GitHubLink/GitHubLink';
interface DeveloperCardProps {
  data: Developer;
}

export function DeveloperCard({ data }: DeveloperCardProps) {
  return (
    <div className={classes.card}>
      <div className={classes.photo}>
        <img
          data-testid="avatar"
          className={classes.image}
          src={data.imgLink}
          alt={data.firstName}
        />
      </div>
      <div className={classes.info}>
        <h2 className={classes.title}>{data.firstName}</h2>
        <h3 className={classes.position}>{data.position}</h3>
        <p className={classes.biography}>{data.biography}</p>
        <GitHubLink href={data.gitHubLink} text="GitHub" />
      </div>
    </div>
  );
}

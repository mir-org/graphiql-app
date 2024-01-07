import classes from './SchoolLink.module.css';

export function SchoolLink() {
  return (
    <a
      className={classes.schoolLink}
      href="https://rs.school/react/"
      target="_blank"
      rel="noreferrer"
    >
      <div className={classes.logo}></div>
    </a>
  );
}

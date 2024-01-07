import classes from './GitHubLink.module.css';
import GitHubLogo from '../../../assets/github-logo.png';
interface GitHubLinkProps {
  href: string | undefined;
  text: string;
}

export function GitHubLink({ href, text }: GitHubLinkProps) {
  if (!href) return;
  return (
    <a className={classes.link} target="_blank" href={href} rel="noreferrer">
      <img className={classes.logo} src={GitHubLogo} alt="github-logo" />
      {text}
    </a>
  );
}

import { ReactNode } from 'react';
import classes from './Footer.module.css';
import { SchoolLink } from '../UI/SchoolLink/SchoolLink';
import { GitHubLink } from '../UI/GitHubLink/GitHubLink';
import ContentWrapper from '../UI/ContentWrapper/ContentWrapper';

interface IProps {
  children?: ReactNode;
}

function Footer({ children }: IProps) {
  return (
    <footer className={classes.footer}>
      <ContentWrapper>
        <div className={classes.innerContent}>
          {children}
          <div className="developers">
            <GitHubLink text="Ilya" href="https://github.com/toronto-tokyo" />
            <GitHubLink text="Vladislav" href="https://github.com/GinezisNWD" />
            <GitHubLink
              text="Miroslav"
              href="https://github.com/miroslav-zarenkov"
            />
          </div>

          <div>2024</div>

          <SchoolLink></SchoolLink>
        </div>
      </ContentWrapper>
    </footer>
  );
}

export default Footer;

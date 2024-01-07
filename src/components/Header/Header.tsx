import { ReactNode, useEffect, useState } from 'react';
import classes from './Header.module.css';
import ContentWrapper from '../UI/ContentWrapper/ContentWrapper';

interface IProps {
  children: ReactNode;
}

function Header({ children }: IProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={`${classes.header} ${isScrolled ? classes.scroll : ''}`}>
      <ContentWrapper>
        <div className={classes.innerContent}>{children}</div>
      </ContentWrapper>
    </header>
  );
}

export default Header;

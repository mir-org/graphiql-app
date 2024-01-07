import { ReactNode } from 'react';
import classes from './ContentWrapper.module.css';

interface IContentWrapperProps {
  children: ReactNode;
  className?: string;
}

function ContentWrapper({ children }: IContentWrapperProps) {
  return <div className={classes.wrapper}>{children}</div>;
}

export default ContentWrapper;

import { ReactNode } from 'react';
import classes from './Toast.module.css';
import CloseButton from '../UI/CloseButton/CloseButton';

interface IProps {
  children: ReactNode;
  imgPath: string;
  onClose: () => void;
}

const Toast = ({ children, imgPath, onClose }: IProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        <img className={classes.icon} src={imgPath} alt="toast-img" />
        <span className={classes.text}>{children}</span>
      </div>
      <CloseButton ariaLabel="Close" clickHandler={onClose} />
    </div>
  );
};

export default Toast;

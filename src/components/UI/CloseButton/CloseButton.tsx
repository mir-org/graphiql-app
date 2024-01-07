import classes from './CloseButton.module.css';
import closeSquare from '../../../assets/close-square-icon.svg';

interface IProps {
  ariaLabel: string;
  clickHandler: () => void;
}

const CloseButton = ({ ariaLabel, clickHandler }: IProps) => {
  return (
    <button
      className={classes.button}
      aria-label={ariaLabel}
      onClick={clickHandler}
    >
      <img
        className={classes.img}
        aria-hidden="true"
        src={closeSquare}
        alt="close-btn"
      />
    </button>
  );
};

export default CloseButton;

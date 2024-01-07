import classes from './PrimaryButton.module.css';

interface PrimaryButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export function PrimaryButton({ children, ...props }: PrimaryButton) {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
}

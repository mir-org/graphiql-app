import { useErrorBoundary } from 'react-error-boundary';
import classes from './ErrorFallback.module.css';

interface IProps {
  error: Error;
}

function ErrorFallback({ error }: IProps) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <p className={classes.title}>Something went wrong:</p>
        <pre className={classes.errorMessage}>{error.message}</pre>
        <button onClick={resetBoundary} className={classes.button}>
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;

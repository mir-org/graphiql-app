import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import classes from './ApiLinkForm.module.css';
import useApiLinkForm from './useApiLinkForm';

interface IProps {
  value: string;
  submitHandler: (value: string) => void;
}

const ApiLinkForm = ({ value, submitHandler }: IProps) => {
  const {
    inputValue,
    handleInputChange,
    handleSubmit,
    labelText,
    changeUrlBtnText,
  } = useApiLinkForm({
    value,
    submitHandler,
  });

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label htmlFor="source">{labelText}</label>
      <input
        className={classes.input}
        id="source"
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <PrimaryButton type="submit">{changeUrlBtnText}</PrimaryButton>
    </form>
  );
};

export default ApiLinkForm;

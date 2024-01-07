import classes from './Textarea.module.css';

interface ITextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  readOnly?: boolean;
}

function Textarea({ value, onChange, className, readOnly }: ITextareaProps) {
  return (
    <textarea
      className={`${classes.textarea} ${className ? className : ''}`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
    />
  );
}

export default Textarea;

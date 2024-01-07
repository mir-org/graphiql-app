interface SubmitButtonProps {
  disabled: boolean;
  text: string;
}

function SubmitButton({ disabled, text }: SubmitButtonProps) {
  return (
    <div>
      <button type="submit" disabled={disabled}>
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;

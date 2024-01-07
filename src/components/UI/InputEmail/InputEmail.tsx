import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';
import useRegion from '../../../hook/useRegion';
import { LOCALE_DATA } from '../../../locales/constants/constants';
import isErrorOfType from '../../../utils/isErrorOfType';

const inputEmailSchema = yup.object().shape({
  email: yup.string().required('required').email('wrong format'),
});

interface InputEmailProps {
  value: string;
  onChange: (value: string) => void;
}

function InputEmail({ value, onChange }: InputEmailProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const region = useRegion();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setError(undefined);
  };

  const validateInput = async () => {
    try {
      await inputEmailSchema.validate({ email: value }, { abortEarly: false });
      setError(undefined);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setError(validationError.errors[0]);
      }
    }
  };

  return (
    <div>
      <label htmlFor="email">
        {region && LOCALE_DATA[region.region].form.input.email}
      </label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={handleChange}
        onBlur={validateInput}
      />
      {!error && (
        <div style={{ display: 'hidden', height: '20px' }}>{error}</div>
      )}
      {error && (
        <div style={{ color: 'red', display: 'block', height: '20px' }}>
          {isErrorOfType(error, ['required']) &&
            `${region && LOCALE_DATA[region.region].validation.required}`}
          {isErrorOfType(error, ['wrong format']) &&
            `${region && LOCALE_DATA[region.region].validation.email}`}
        </div>
      )}
    </div>
  );
}

export default InputEmail;

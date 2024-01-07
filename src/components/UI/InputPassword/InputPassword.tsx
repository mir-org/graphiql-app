import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';
import useRegion from '../../../hook/useRegion';
import { LOCALE_DATA } from '../../../locales/constants/constants';
import isErrorOfType from '../../../utils/isErrorOfType';

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('required')
    .min(8, 'wrong format')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'wrong format'
    ),
});

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

function PasswordInput({ value, onChange }: PasswordInputProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const region = useRegion();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setError(undefined);
  };

  const validateInput = async () => {
    try {
      await passwordSchema.validate({ password: value }, { abortEarly: false });
      setError(undefined);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setError(validationError.errors[0]);
      }
    }
  };

  return (
    <div>
      <label htmlFor="password">
        {region && LOCALE_DATA[region.region].form.input.password}
      </label>
      <input
        type="password"
        id="password"
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
            `${region && LOCALE_DATA[region.region].validation.password}`}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;

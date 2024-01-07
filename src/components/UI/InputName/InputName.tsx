import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';
import useRegion from '../../../hook/useRegion';
import { LOCALE_DATA } from '../../../locales/constants/constants';
import isErrorOfType from '../../../utils/isErrorOfType';

interface InputNameProps {
  value: string;
  onChange: (value: string) => void;
}

function InputName({ value, onChange }: InputNameProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const region = useRegion();

  const inputNameSchema = yup.object().shape({
    name: yup
      .string()
      .required('required')
      .matches(/^[A-ZА-ЯЁ][a-zа-яё]*$/, 'wrong format'),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setError(undefined);
  };

  const validateInput = async () => {
    try {
      await inputNameSchema.validate({ name: value }, { abortEarly: false });
      setError(undefined);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError(error.errors[0]);
      }
    }
  };

  return (
    <div>
      <label htmlFor="name">
        {region && LOCALE_DATA[region.region].form.input.name}
      </label>
      <input
        type="text"
        id="name"
        value={value}
        onChange={handleChange}
        onBlur={validateInput}
      />
      {!error && <div style={{ display: 'hidden', height: '20px' }}></div>}
      {error && (
        <div style={{ color: 'red', display: 'block', height: '20px' }}>
          {isErrorOfType(error, ['required']) &&
            `${region && LOCALE_DATA[region.region].validation.required}`}
          {isErrorOfType(error, ['wrong format']) &&
            `${region && LOCALE_DATA[region.region].validation.name}`}
        </div>
      )}
    </div>
  );
}

export default InputName;

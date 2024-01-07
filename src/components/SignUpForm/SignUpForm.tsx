import InputPassword from '../UI/InputPassword/InputPassword';
import styles from './SignUpForm.module.css';
import InputName from '../UI/InputName/InputName';
import { useState } from 'react';
import { registerWithEmailAndPassword } from '../../firebase';
import InputEmail from '../UI/InputEmail/InputEmail';
import * as yup from 'yup';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { setError } from '../../redux/slices/GraphQLSlice';
import useErrorToastClose from '../../utils/useErrorToastClose';
import Toasts from '../Toasts/Toasts';
import { PrimaryButton } from '../UI/PrimaryButton/PrimaryButton';

const signUpFormSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[A-ZА-ЯЁ][a-zа-яё]*$/),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
});

function SignUpForm() {
  const { errors } = useAppSelector((store) => store.graphQL);
  const dispatch = useAppDispatch();
  const region = useRegion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await registerWithEmailAndPassword(
        formData.name,
        formData.email,
        formData.password
      );
    } catch (error) {
      if (error instanceof Error) {
        const err = { id: Date.now(), message: error.message };
        dispatch(setError([...errors, err]));
      } else {
        const err = { id: Date.now(), message: 'Auth: something went wrong' };
        dispatch(setError([...errors, err]));
      }
    }
  };
  const isValid = signUpFormSchema.isValidSync(formData);

  return (
    <>
      {errors.length > 0 && (
        <Toasts toastsData={errors} handleErrToastClose={useErrorToastClose} />
      )}

      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <InputName
          value={formData.name}
          onChange={(value: string) => handleChange('name', value)}
        />
        <InputEmail
          value={formData.email}
          onChange={(value: string) => handleChange('email', value)}
        />
        <InputPassword
          value={formData.password}
          onChange={(value: string) => handleChange('password', value)}
        />
        <PrimaryButton disabled={!isValid} type="submit">
          {(region && LOCALE_DATA[region.region].form.button.signUp) ?? ''}
        </PrimaryButton>
      </form>
    </>
  );
}

export default SignUpForm;

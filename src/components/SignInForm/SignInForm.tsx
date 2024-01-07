import { useNavigate } from 'react-router-dom';
import InputEmail from '../UI/InputEmail/InputEmail';
import InputPassword from '../UI/InputPassword/InputPassword';
import styles from './SignInForm.module.css';
import { useState } from 'react';
import { logInWithEmailAndPassword } from '../../firebase';
import * as yup from 'yup';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { setError } from '../../redux/slices/GraphQLSlice';
import Toasts from '../Toasts/Toasts';
import useErrorToastClose from '../../utils/useErrorToastClose';
import { PrimaryButton } from '../UI/PrimaryButton/PrimaryButton';

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

function SignInForm() {
  const { errors } = useAppSelector((store) => store.graphQL);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      await logInWithEmailAndPassword(formData.email, formData.password);
      navigate('/main');
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
  const isValid = signInFormSchema.isValidSync(formData);

  return (
    <>
      {errors.length > 0 && (
        <Toasts toastsData={errors} handleErrToastClose={useErrorToastClose} />
      )}
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <InputEmail
          value={formData.email}
          onChange={(value: string) => handleChange('email', value)}
        />
        <InputPassword
          value={formData.password}
          onChange={(value: string) => handleChange('password', value)}
        />
        <PrimaryButton disabled={!isValid} type="submit">
          {(region && LOCALE_DATA[region.region].form.button.signIn) ?? ''}
        </PrimaryButton>
      </form>
    </>
  );
}

export default SignInForm;

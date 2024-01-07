import { useState } from 'react';
import { LOCALE_DATA } from '../../../locales/constants/constants';
import useRegion from '../../../hook/useRegion';

interface IProps {
  value: string;
  submitHandler: (value: string) => void;
}

const useApiLinkForm = ({ value, submitHandler }: IProps) => {
  const [inputValue, setInputValue] = useState(value);
  const region = useRegion();

  const labelText =
    region && LOCALE_DATA[region.region].mainPage.apiLinkForm.label;

  const changeUrlBtnText =
    region && LOCALE_DATA[region.region].mainPage.apiLinkForm.changeApiBtn;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitHandler(inputValue);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  return {
    inputValue,
    handleSubmit,
    handleInputChange,
    labelText,
    changeUrlBtnText,
  };
};

export default useApiLinkForm;

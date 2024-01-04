import { useState } from 'react';
import { useAppSelector } from '../../hook/useRedux';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';

const useDocumentation = () => {
  const { documentation } = useAppSelector((store) => store.graphQL);
  const [isFetching] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const region = useRegion();

  const handleDocsBtnClick = async () => {
    setIsContentVisible((prev) => !prev);
  };

  const docsBtnText =
    region && LOCALE_DATA[region.region].sideTools.docs.docsBtn;

  return {
    documentation,
    handleDocsBtnClick,
    docsBtnText,
    isFetching,
    isContentVisible,
  };
};

export default useDocumentation;

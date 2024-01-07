import { useState } from 'react';
import useRegion from '../../hook/useRegion';
import { LOCALE_DATA } from '../../locales/constants/constants';
import { ITab } from '../../shared/types';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import { setHeaders, setVariables } from '../../redux/slices/GraphQLSlice';

const useEditorTools = () => {
  const region = useRegion();
  const tabs: ITab[] = [
    {
      label:
        (region && LOCALE_DATA[region.region].mainPage.editorTabs.variables) ||
        '',
      id: 1,
    },
    {
      label:
        (region && LOCALE_DATA[region.region].mainPage.editorTabs.headers) ||
        '',
      id: 2,
    },
  ];
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  const dispatch = useAppDispatch();
  const { variables, headers } = useAppSelector((store) => store.graphQL);

  const handleTabClick = (value: number) => {
    setSelectedTabId(value);
  };

  const handleVariablesChange = (value: string) => {
    dispatch(setVariables(value));
  };

  const handleHeadersChange = (value: string) => {
    dispatch(setHeaders(value));
  };

  return {
    tabs,
    selectedTabId,
    variables,
    headers,
    handleTabClick,
    handleVariablesChange,
    handleHeadersChange,
  };
};

export default useEditorTools;

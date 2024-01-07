import { ReactNode, useState } from 'react';
import RegionContext from './RegionContext';
import { INITIAL_REGION } from '../../../shared/constants';

interface IProps {
  children: ReactNode;
}

const RegionProvider = ({ children }: IProps) => {
  const [region, setRegion] = useState(INITIAL_REGION);
  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

export default RegionProvider;

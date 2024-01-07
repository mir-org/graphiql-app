import { useContext } from 'react';
import RegionContext from '../hoc/context/RegionContext/RegionContext';

const useRegion = () => useContext(RegionContext);

export default useRegion;

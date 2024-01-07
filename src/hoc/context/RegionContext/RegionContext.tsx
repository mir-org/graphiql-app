import { createContext } from 'react';

interface IRegionContext {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const RegionContext = createContext<IRegionContext | null>(null);

export default RegionContext;

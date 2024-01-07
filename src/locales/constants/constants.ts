import enLocale from '../data/en.json';
import ruLocale from '../data/ru.json';

type Regions = {
  [key: string]: string;
};

export const REGIONS: Regions = {
  EN: 'EN',
  RU: 'RU',
};

export const LOCALE_DATA = {
  [REGIONS.EN]: enLocale,
  [REGIONS.RU]: ruLocale,
};

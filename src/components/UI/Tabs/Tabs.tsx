import { ITab } from '../../../shared/types';
import classes from './Tabs.module.css';

interface IProps {
  tabs: ITab[];
  selectedId: number;
  onClick: (value: number) => void;
  className?: string;
}

const Tabs = ({ tabs, selectedId, onClick, className }: IProps) => {
  return (
    <ul className={`${classes.wrapper} ${className && className}`}>
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={`${classes.tab} ${
            selectedId === tab.id ? `${classes.active}` : ''
          }`}
          onClick={() => onClick(tab.id)}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;

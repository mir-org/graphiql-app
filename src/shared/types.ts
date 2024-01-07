import { User } from 'firebase/auth';
import { ChangeEvent, ReactNode } from 'react';

export interface InputStringProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IProps {
  children: ReactNode;
}

export interface IAuthContext {
  user: User | null;
  loading: boolean | null;
  error: Error | null;
}

export interface ITab {
  id: number;
  label: string;
}

export interface Developer {
  firstName: string;
  position: string;
  biography: string;
  gitHubLink: string;
  imgLink?: string;
}

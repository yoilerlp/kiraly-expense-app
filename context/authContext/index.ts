import { User } from '@/interfaces';
import { createContext } from 'react';

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  shouldReAuth: boolean;
  appUnlocked: boolean;
  setShouldReAuth?: (value: boolean) => void;
  logOut: () => void;
  getUserToken?: () => string | null;
  reloadUser?: () => void;
  updateUserData: (data: any) => void;
  setAppUnlocked: (value: boolean) => void;
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default AuthContext;


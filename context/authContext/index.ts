import { User } from '@/interfaces';
import { createContext } from 'react';

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  logOut: () => void;
  getUserToken?: () => string | null;
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default AuthContext;


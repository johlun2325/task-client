import { ReactNode } from 'react';
import { AuthContext } from './authContext';
import { useAuthState } from './hooks/useAuthState';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuthState();
  
  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

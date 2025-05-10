export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
  
export interface AuthContextType extends AuthState {
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

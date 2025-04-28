export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}
  
export interface AuthContextType extends AuthState {
    login: () => Promise<void>;
    logout: () => void;
}

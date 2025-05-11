export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
 
// throws error on fail
export interface AuthContextType extends AuthState {
    login: () => Promise<void | Error>;
    logout: () => Promise<void | Error>;
}

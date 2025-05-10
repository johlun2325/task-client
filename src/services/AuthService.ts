const API_BASE_URL = 'http://localhost:8080';

export const authService = {
  // Check if user is logged in
  checkAuthStatus: async (): Promise<boolean> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.log('No token found');
      return false;
    }

    try {
      return await authService.validateToken(token);
    } catch (error) {
      console.error('Token validation failed:', error);
      authService.removeToken();
      return false;
    }
  },

  // Login with OAuth
  login: async (): Promise<boolean> => {
    console.log('Initiating Google OAuth2 login flow...');
    try {
      const googleLoginUrl = await authService.getLoginUrl();
      console.log('Redirecting to Google login...');
      window.location.href = googleLoginUrl;
      return true;
    } catch (error) {
      console.error('Login initiation error:', error);
      return false;
    }
  },

  // Handle redirect after login 
  handleRedirect: async (): Promise<boolean> => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      console.error('Authentication error:', error);
      window.history.replaceState({}, document.title, window.location.pathname);
      return false;
    }

    if (!token) {
      window.history.replaceState({}, document.title, window.location.pathname);
      return false;
    }

    console.log('Token received from redirect, storing in localStorage');
    localStorage.setItem('auth_token', token);
    const tokenValid = await authService.checkAuthStatus();
    window.history.replaceState({}, document.title, window.location.pathname);
    return tokenValid;
  },

  // Logout user
  logout: async (): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.log('No token found to logout');
      return;
    }

    try {
      await authService.notifyBackendLogout(token);
    } catch (error) {
      console.error('Logout notification failed:', error);
    }

    authService.removeToken();
  },

  // Helper method to get auth_token
  getToken: (): string | null => localStorage.getItem('auth_token'),

  // Validate token via backend call
  validateToken: async (token: string): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const isValid = response.ok;
    console.log(`Token validation result: ${isValid}`);
    return isValid;
  },

  // Get login URL from backend
  getLoginUrl: async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/auth/login?provider=google`, { method: 'GET' });

    if (!response.ok) throw new Error('Failed to get login URL');
    
    const { url: googleLoginUrl } = await response.json();
    if (!googleLoginUrl) throw new Error('No login URL received');

    return googleLoginUrl;
  },

  // Notify backend about logout
  notifyBackendLogout: async (token: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    console.log('Logout notification sent to backend');
  },

  // Remove the token from localStorage
  removeToken: (): void => {
    localStorage.removeItem('auth_token');
    console.log('Token removed from localStorage');
  }
};

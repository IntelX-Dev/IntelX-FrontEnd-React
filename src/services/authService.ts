
import { apiRequest } from './api';
import type { LoginCredentials, RegisterCredentials, AuthTokens, User, LoginResponse, AuthResponse } from '../types/auth';

class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  async login(credentials: LoginCredentials): Promise<AuthResponse<LoginResponse>> {
    const response = await apiRequest<AuthResponse<LoginResponse>>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.setTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
    }

    return response;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse<LoginResponse>> {
    const response = await apiRequest<AuthResponse<LoginResponse>>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.setTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
    }

    return response;
  }

  async logout(): Promise<void> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    
    try {
      if (accessToken) {
        await apiRequest('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ 
            refresh_token: refreshToken 
          }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser(): Promise<AuthResponse<User>> {
    const response = await apiRequest<AuthResponse<User>>('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${this.getAccessToken()}`,
      },
    });

    return response;
  }

  async refreshToken(): Promise<AuthResponse<{ access_token: string; refresh_token: string }>> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiRequest<AuthResponse<{ access_token: string; refresh_token: string }>>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.success && response.data) {
      this.setTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
    }

    return response;
  }

  setTokens(tokens: AuthTokens): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

export const authService = new AuthService();
export default authService;

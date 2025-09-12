export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Mock authentication functions (replace with real API calls)
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (credentials.email === "admin@kodigo.com" && credentials.password === "admin123") {
      const response = {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: 1,
          email: credentials.email,
          name: "Admin User"
        }
      };
      
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    }
    
    throw new Error('Credenciales inválidas');
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = {
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone
      }
    };
    
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};
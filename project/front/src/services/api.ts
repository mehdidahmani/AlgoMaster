const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface SignupRequest {
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  motDePasse: string;
  userType: string;
  specialite: string;
  annee?: string;
  grade?: string;
}

export interface User {
  idUser: number;
  Nom: string;
  Prenom: string;
  DateNaissance: string;
  Email: string;
  Specialite: string;
  Annee?: number;
  Grade?: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  user: User;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

async function handleResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'API request failed');
  }
  return data;
}

export const apiService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  signup: async (userData: SignupRequest): Promise<SignupResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await fetch(`${API_BASE_URL}/refresh`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

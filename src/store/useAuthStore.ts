// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  objectId?: string;
  email?: string;
  name?: string;
  // sesuaikan dengan response API jika ada field lain
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (loginData: any) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (loginData) => {
      set({ isLoading: true, error: null });
      try {
        // Menggunakan API yang diminta
        const response = await axios.post(
          'https://neededstream-us.backendless.app/api/data/ExerciseHomepageLogin',
          loginData
        );
        
        // Asumsi response mengembalikan object user yang valid jika sukses
        // Karena ini API latihan, kita set user dari data yang dikembalikan
        // Jika API me-return array, ambil item pertama
        const userData = Array.isArray(response.data) ? response.data[0] : response.data;

        set({ user: userData, isAuthenticated: true, isLoading: false });
      } catch (err: any) {
        set({ 
          error: err.response?.data?.message || 'Login failed. Please check credentials.', 
          isLoading: false 
        });
      }
    },

    logout: () => {
      set({ user: null, isAuthenticated: false });
    },
  }),
  {
    name: 'coffee-auth-storage',
  }
));
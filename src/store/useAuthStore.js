import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('jwt_token') || null,
  setToken: (token) => {
    localStorage.setItem('jwt_token', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('jwt_token');
    set({ token: null });
  },
}));

export default useAuthStore;

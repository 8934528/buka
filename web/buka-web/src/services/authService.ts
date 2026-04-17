import api from './api';
import type { AuthResponse } from '../types';
import Swal from 'sweetalert2';

export const authService = {
  async login(email: string, password: string): Promise<string> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        passwordHash: password,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          text: 'Login successful',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
        return response.data.token;
      }
      throw new Error('No token received');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid email or password';
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: message,
        timer: 3000,
        showConfirmButton: true
      });
      throw new Error(message);
    }
  },

  async register(name: string, email: string, password: string): Promise<void> {
    try {
      await api.post('/auth/register', {
        name,
        email,
        passwordHash: password,
      });
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Please login with your credentials',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: message,
        timer: 3000,
        showConfirmButton: true
      });
      throw new Error(message);
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    Swal.fire({
      icon: 'info',
      title: 'Logged Out',
      text: 'You have been logged out successfully',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
    window.location.href = '/login';
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};

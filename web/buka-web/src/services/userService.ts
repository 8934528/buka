import api from './api';
import type { UpdateProfileRequest, User } from '../types';
import Swal from 'sweetalert2';

export const userService = {
  async getProfile(): Promise<User> {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load profile';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        timer: 3000,
        showConfirmButton: true
      });
      throw new Error(message);
    }
  },

  async updateProfile(payload: UpdateProfileRequest): Promise<User> {
    try {
      const response = await api.put('/user/profile', payload);
      Swal.fire({
        icon: 'success',
        title: 'Profile updated',
        text: 'Your details were saved successfully.',
        timer: 1800,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile';
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: message,
        timer: 3000,
        showConfirmButton: true
      });
      throw new Error(message);
    }
  },
};

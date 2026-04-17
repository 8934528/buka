import api from './api';
import type { ZodiacResult, HistoryItem } from '../types';
import toast from 'react-hot-toast';

export const zodiacService = {
  async getZodiac(month: number, day: number): Promise<ZodiacResult> {
    try {
      const response = await api.get(`/zodiac/${month}/${day}`);
      toast.success(`You are a ${response.data.sign}!`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to get zodiac';
      toast.error(message);
      throw new Error(message);
    }
  },

  async getHistory(): Promise<HistoryItem[]> {
    try {
      const response = await api.get('/zodiac/history');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load history';
      toast.error(message);
      throw new Error(message);
    }
  },
};

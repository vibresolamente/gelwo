import axios from 'axios';
import { getSession } from 'next-auth/react';

/**
 * Axios instance with JWT from NextAuth added automatically.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export default api;

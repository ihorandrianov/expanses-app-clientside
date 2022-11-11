import axios from 'axios';
import { Expanse, User } from '../Types/types';

export interface LoginCred {
  email: string;
  password: string;
}

const DEFAULT_URL = 'http://localhost:8000';

const client = axios.create({
  withCredentials: true,
  baseURL: DEFAULT_URL,
});

export const logIn = async (credentials: LoginCred): Promise<User | null> => {
  try {
    const response = await client.post('/auth/log-in', credentials, {
      withCredentials: true,
    });
    const result = await response.data;
    return result as User;
  } catch (e) {
    return null;
  }
};

export const logOut = async () => {
  try {
    const data = await client.post('/auth/log-out', {
      withCredentials: true,
    });

    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const isLoggedIn = async (): Promise<User | null> => {
  try {
    const response = await client.get('/auth', {
      withCredentials: true,
    });
    const user = response.data;

    return user as User;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getExpansesById = async (
  id: number
): Promise<{ expanses: Expanse[] } | null> => {
  try {
    const response = await client.get(`/users/${id}/expanses`, {
      withCredentials: true,
    });
    const expanses = response.data;
    console.log(expanses);
    return expanses;
  } catch (e) {
    return null;
  }
};

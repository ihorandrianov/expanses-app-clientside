import axios from 'axios';
import { Expanse, User } from '../Types/types';

export interface LoginCred {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
}

export interface EditProfile {
  id: number;
  payload: Partial<User>;
}

export interface PasswordChange {
  userId: number;
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

export interface ExpanseWithId {
  userId: number;
}

export interface VerificationToken {
  token: string;
}

const DEFAULT_URL = 'http://localhost:8000';

const client = axios.create({
  withCredentials: true,
  baseURL: DEFAULT_URL,
});

export const logIn = async (credentials: LoginCred): Promise<User> => {
  try {
    const response = await client.post('/auth/log-in', credentials, {
      withCredentials: true,
    });
    const result = await response.data;
    return result as User;
  } catch (e) {
    throw new Error(JSON.stringify(e));
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

export const isLoggedIn = async (): Promise<User> => {
  try {
    const response = await client.get('/auth', {
      withCredentials: true,
    });
    const user = response.data;

    return user;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const getExpansesById = async (id: number): Promise<Expanse[]> => {
  try {
    const response = await client.post(`/expanses/user-expanses`, {
      id,
    });
    const expanses = response.data;
    return expanses;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const registerNewUser = async (
  registerData: RegisterData
): Promise<User> => {
  try {
    const response = await client.post('/auth/register', registerData);
    const user = await response.data;
    return user;
  } catch (e: unknown) {
    throw new Error(JSON.stringify(e));
  }
};

export const editProfile = async (editProfile: EditProfile): Promise<User> => {
  try {
    const response = await client.patch(
      `/users/${editProfile.id}`,
      editProfile.payload
    );
    const user = await response.data;

    return user;
  } catch (e: unknown) {
    throw new Error(JSON.stringify(e));
  }
};

export const changePassword = async (passwordChangeData: PasswordChange) => {
  try {
    const response = await client.patch(
      `/auth/password-change`,
      passwordChangeData
    );
    const user = response.data;

    return user;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const getExpanseById = async (id: number) => {
  try {
    const response = await client.get(`/expanses/${id}`);
    const expanse = await response.data;

    return expanse;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const addNewExpanse = async (expanse: Expanse): Promise<void> => {
  try {
    client.post('/expanses', expanse);
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const verifyEmail = async (token: VerificationToken): Promise<void> => {
  try {
    await client.post('/email-verification/confirm', token);
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const resendEmailToken = async () => {
  try {
    await client.post('/email-verification/resend-confirmation-link');
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

export const deleteExpanse = async (id: number) => {
  try {
    await client.delete(`/expanses/${id}`);
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

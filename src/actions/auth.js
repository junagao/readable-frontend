import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = (userId, userName) => ({
  type: SIGN_IN,
  payload: { userId, userName },
});

export const signOut = () => ({
  type: SIGN_OUT,
});

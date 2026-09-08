import { apiFetch } from './client';

export async function loginUser(email, password) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function registerUser(email, password) {
  return apiFetch('/api/auth/register', {
    method: 'POST',
    body: { email, password },
  });
}

export async function getMe() {
  return apiFetch('/api/auth/me', {
    method: 'GET',
  });
}

export async function logoutUser() {
  return apiFetch('/api/auth/logout', {
    method: 'POST',
  });
}

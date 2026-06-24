import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({ baseURL });

// Origin of the API host (strips the trailing /api/v1) — used to resolve
// relative file URLs when the backend stores uploads on local disk.
export const API_ORIGIN = baseURL.replace(/\/api\/v\d+\/?$/, '');

/** Make a stored file URL absolute (S3 URLs already are). */
export const resolveAsset = (url) =>
  url && url.startsWith('/uploads') ? `${API_ORIGIN}${url}` : url;

const TOKEN_KEY = 'trrip_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Attach the bearer token to every request.
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise errors into a readable message and auto-logout on 401.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    if (status === 401 && tokenStore.get()) {
      tokenStore.clear();
      // Avoid redirect loops on the auth pages themselves.
      if (!/\/(login|register)$/.test(window.location.pathname)) {
        window.location.assign('/login');
      }
    }
    return Promise.reject({ ...error, message, status, details: error.response?.data?.details });
  }
);

export default api;

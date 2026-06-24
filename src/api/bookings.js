import { api } from './client.js';

export const bookingsApi = {
  /** Upload files with progress callback. `files` is a FileList / File[]. */
  upload: (files, onProgress) => {
    const form = new FormData();
    Array.from(files).forEach((f) => form.append('files', f));
    return api
      .post('/bookings/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100));
        },
      })
      .then((r) => r.data.data);
  },
  list: () => api.get('/bookings').then((r) => r.data.data.bookings),
  remove: (id) => api.delete(`/bookings/${id}`).then((r) => r.data),
};

export default bookingsApi;

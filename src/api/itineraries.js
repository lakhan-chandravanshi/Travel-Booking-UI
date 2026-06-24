import { api } from './client.js';

export const itinerariesApi = {
  generate: (payload = {}) =>
    api.post('/itineraries/generate', payload).then((r) => r.data.data.itinerary),
  list: () => api.get('/itineraries').then((r) => r.data.data.itineraries),
  get: (id) => api.get(`/itineraries/${id}`).then((r) => r.data.data.itinerary),
  update: (id, payload) =>
    api.patch(`/itineraries/${id}`, payload).then((r) => r.data.data.itinerary),
  remove: (id) => api.delete(`/itineraries/${id}`).then((r) => r.data),
  share: (id, isPublic) =>
    api.post(`/itineraries/${id}/share`, { isPublic }).then((r) => r.data.data),
  getPublic: (slug) =>
    api.get(`/public/itineraries/${slug}`).then((r) => r.data.data.itinerary),
};

export default itinerariesApi;

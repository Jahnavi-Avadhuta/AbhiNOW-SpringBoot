import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Automatically add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth
export const register = (data) =>
  API.post('/auth/register', data);

export const login = (data) =>
  API.post('/auth/login', data);

// OTP  ← ADD HERE
export const sendOtp = (phone) =>
  API.post('/otp/send', { phone });

export const verifyOtp = (phone, otp) =>
  API.post('/otp/verify', { phone, otp });

// User
export const getProfile = () =>
  API.get('/user/profile');

export const setRole = (data) =>
  API.post('/user/set-role', data);

// Locations
export const getLocations = () =>
  API.get('/locations');

export const searchLocations = (query) =>
  API.get(`/locations/search?query=${query}`);

// Driver
export const postRoute = (data) =>
  API.post('/driver/route', data);

export const getRequests = () =>
  API.get('/driver/requests');

export const handleRequest = (id, action) =>
  API.post(`/driver/requests/${id}/handle?action=${action}`);

export const completeRide = (id) =>
  API.post(`/driver/rides/${id}/complete`);

export const getDriverRides = () =>
  API.get('/driver/rides');

// Passenger
export const searchRides = (data) =>
  API.post('/passenger/search', data);

export const bookRide = (data) =>
  API.post('/passenger/book', data);

export const getPassengerRides = () =>
  API.get('/passenger/rides');

export const getOngoingRides = () =>
  API.get('/passenger/rides/ongoing');

export const rateRide = (data) =>
  API.post('/passenger/rate', data);

// Admin
export const getAdminStats = () =>
  API.get('/admin/stats');

export const getAllUsers = () =>
  API.get('/admin/users');

export const suspendUser = (id) =>
  API.post(`/admin/users/${id}/suspend`);

export const unsuspendUser = (id) =>
  API.post(`/admin/users/${id}/unsuspend`);

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

export const deleteRating = (id) =>
  API.delete(`/admin/ratings/${id}`);

export const addLocation = (name, lat, lon) =>
  API.post(
    `/admin/locations?name=${name}&lat=${lat}&lon=${lon}`
  );

export const deleteLocation = (id) =>
  API.delete(`/admin/locations/${id}`);

// EXPORTS ← REPLACE BOTTOM PART
export { API };
export default API;
import axios from '@/utils/request';

// get token
export const getToken = (params) => {
  return axios.get('/xxx', { params });
};

// logout
export const logout = () => {
  return axios.post('/xxx');
};

// get user info
export const getUserInfo = (data) => {
  return axios.post('/xxx', data);
};

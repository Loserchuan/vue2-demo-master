import axios from '@/utils/request';

// get
export const get = (params) => {
  return axios.get('/xxx', { params });
};

// post
export const post = (data) => {
  return axios.post('/xxx', data);
};

// 下载文件
export const exportData = (data) => {
  return axios.post('/xxx', data, { responseType: 'blob' });
};

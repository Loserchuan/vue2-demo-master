/**
 * axios实例封装，在这里加上项目对接口请求的统一处理
 */
import axios from 'axios';
import config from '@/utils/config';
import message from 'ant-design-vue/es/message';

const { apiHost } = config;

const option = {
  baseURL: apiHost,
};

// 创建 axios 实例
const service = axios.create(option);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 判断处理结果是文件类型时，不对结果集处理，直接返回
    if (res instanceof Blob) {
      return response;
    }
    // 这里需要根据不同的项目后端接口封装情况做适当调整
    if (res.isError) {
      message.error((res && res.message) || '未知异常！');
      return Promise.reject(new Error((res && res.message) || '未知异常！'));
    } else {
      return res.data;
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled');
      return null;
    }
    message.error(error.message || '未知异常！');
    return Promise.reject(error);
  },
);

export default service;

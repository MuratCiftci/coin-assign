import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3"
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 500 || response.status === 404) {
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 500) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;

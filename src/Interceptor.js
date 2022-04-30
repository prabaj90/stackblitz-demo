import axios from 'axios';

export const API = 'http://localhost:5000';

const customAxios = axios.create({
  baseURL: API,
  timeout: 1000,
  headers: {},
});

const requestHandler = (request) => {
  console.log(request);
  if (!request.url.includes('/login')) {
    request.headers['x-access-token'] = localStorage.getItem('token');
  }
  return request;
};

const responseHandler = (response) => {
  console.log(response);
  if (response.status != 200 && response.status != 204) {
    window.location = 'http://www.google.com';
  }
  return response;
};

const errorHandler = (error) => {
  window.location = 'http://www.google.com';
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;

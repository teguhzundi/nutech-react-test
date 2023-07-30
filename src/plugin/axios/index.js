import axios from 'axios';

const http = axios.create({
  baseURL: 'https://private-abf457-reacttest14.apiary-mock.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;

import axios from 'axios';

const url = 'http://localhost:5000';
const token = 'd95cae0a85cd270fc8f409d8861d9834';

const api = axios.create({
  baseURL: url,
  headers: { Authorization: `Bearer ${token}` },
});

export default api;

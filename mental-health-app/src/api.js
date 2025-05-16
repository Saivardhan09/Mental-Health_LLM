import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Adjust this if your Express server runs on a different address
    timeout: 10000, // 20 seconds timeout
});

export default api;

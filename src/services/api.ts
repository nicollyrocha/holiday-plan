import axios from 'axios';

const api = axios.create({
	baseURL: 'https://holiday-plan-api.onrender.com',
});

export { api };

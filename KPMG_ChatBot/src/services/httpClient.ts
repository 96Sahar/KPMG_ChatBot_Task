import axios from 'axios';

const URL = import.meta.env.VITE_URL;

const client = axios.create({
	baseURL: URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

const setAuthToken = (token: string) => {
	if (!token) {
		delete client.defaults.headers.common['Authorization'];
		return;
	}
	client.defaults.headers.common['Authorization'] = `JWT ${token}`;
};

const refreshToken = async (refreshToken: string) => {
	const response = await client.post('/auth/refresh', { refreshToken });
	const expiresIn = 50 * 60 * 1000;
	const expiration = new Date(Date.now() + expiresIn).toISOString();
	localStorage.setItem('authExpiration', expiration);
	localStorage.setItem('authToken', response.data.accessToken);
	localStorage.setItem('refreshToken', response.data.refreshToken);
	return response.data.accessToken;
};

const checkToken = async () => {
	let token = localStorage.getItem('authToken');
	const storedRefreshToken = localStorage.getItem('refreshToken');
	const expiration = localStorage.getItem('authExpiration');
	if (!token) {
		if (!storedRefreshToken) throw new Error('User is not authenticated');
		token = await refreshToken(storedRefreshToken);
	}
	if (expiration && new Date(expiration) < new Date()) {
		if (!storedRefreshToken) throw new Error('No refresh token');
		token = await refreshToken(storedRefreshToken);
	}
	return token;
};
export { setAuthToken, checkToken, client };

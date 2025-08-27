import axios from 'axios';
import { client, setAuthToken } from './httpClient';
import type { LoginData, RegisterData } from './interfaceServices';
import { clearLocalStorage } from '../utils/functions';

const register = async (userData: RegisterData) => {
	try {
		const response = await client.post('/auth/register', userData);
		console.log(response.data);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err))
			throw new Error(
				err.response?.data || 'Registration failed via an axios error'
			);
		throw new Error('Registration failed');
	}
};

const login = async (loginData: LoginData) => {
	try {
		const response = await client.post('/auth/login', loginData);
		const { accessToken, refreshToken } = response.data;

		localStorage.setItem('authToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		const expiresIn = 50 * 60 * 1000;
		const expiration = new Date(Date.now() + expiresIn).toISOString();
		localStorage.setItem('authExpiration', expiration);
		setAuthToken(accessToken);
		console.log('login succeed');
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err))
			throw new Error(
				err.response?.data || 'Login failed via an axios error'
			);
		throw new Error('Login failed');
	}
};

const logout = async () => {
	try {
		const refreshToken = localStorage.getItem('refreshToken');
		if (!refreshToken) throw new Error('No refresh token found');
		await client.post('/auth/logout', { refreshToken });
		clearLocalStorage();
		setAuthToken('');
	} catch (err) {
		clearLocalStorage();
		setAuthToken('');
		if (axios.isAxiosError(err))
			throw new Error(
				err.response?.data || 'Logout failed via an axios error'
			);
		throw new Error('Logout failed');
	}
};
export { register, login, logout };

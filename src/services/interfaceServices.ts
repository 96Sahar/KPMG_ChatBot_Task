interface User {
	_id: string;
	email: string;
}

interface LoginResponse {
	email: string;
	_id: string;
	accessToken: string;
	refreshToken: string;
}

interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}

interface RegisterData {
	email: string;
	password: string;
}

interface LoginData {
	email: string;
	password: string;
}

export type { User, LoginResponse, RefreshResponse, RegisterData, LoginData };

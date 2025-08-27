const clearLocalStorage = () => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('authExpiration');
};

export { clearLocalStorage };

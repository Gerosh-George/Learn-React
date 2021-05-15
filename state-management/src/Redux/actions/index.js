export const addMovie = (data) => {
	return {
		type: "ADD",
		payload: data,
	};
};

export const deleteMovie = (name) => {
	return {
		type: "DELETE",
		payload: name,
	};
};

export const login = () => {
	return {
		type: "LOGIN",
	};
};

export const logout = () => {
	return {
		type: "LOGOUT",
	};
};

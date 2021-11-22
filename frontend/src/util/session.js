import users from "../apis/users";

export const checkLoggedIn = async () => {
	const response = await users.get("/session");
	const user = response.data;
	let preloadedState = {};
	if (user) {
		preloadedState = {
			auth: {
				isSignedIn: true,
				unauthorized: false,
				user: user,
			},
		};
	}
	return preloadedState;
};

const saveSessionUser = function (session, user) {
	session.user = user;
};

const destroySession = function (session) {
	session.destroy();
};

const isUserLoggedIn = function (session, key) {
	if (session[key]) {
		return true;
	}

	return false;
};

const getUserId = function (session) {
	return session.user.id;
};

module.exports = {
	saveSessionUser,
	destroySession,
	isUserLoggedIn,
	getUserId,
};

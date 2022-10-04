const saveSessionUser = function (session, user) {
	session.user = user;
};

const destroySession = function (session) {
	session.destroy();
};

const checkForSessionValue = function (session, key) {
	if (session[key]) {
		return true;
	}

	return false;
};

module.exports = {
	saveSessionUser,
	destroySession,
	checkForSessionValue,
};

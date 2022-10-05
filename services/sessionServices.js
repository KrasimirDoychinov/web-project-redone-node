const saveSessionUser = function (session, user) {
	session.user = user;
};

const destroySession = function (session) {
	session.destroy();
};

const getUserId = function (session) {
	return session.user.id;
};

module.exports = {
	saveSessionUser,
	destroySession,
	getUserId,
};

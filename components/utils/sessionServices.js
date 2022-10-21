const saveUser = function (session, user) {
	session.user = user;
};

const destroySession = function (session) {
	session.destroy();
};

const sessionService = {
	saveUser,
	destroySession,
};

module.exports = sessionService;

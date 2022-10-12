const authorized = function (req, res, next) {
	if (!res.locals.isLoggedIn) {
		res.redirect('/auth/login');
	}

	next();
};

module.exports = {
	authorized,
};

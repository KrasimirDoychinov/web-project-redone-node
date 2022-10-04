const authorized = function (req, res, next) {
	if (!res.locals.isLoggedIn) {
		res.redirect('/user/login');
	}

	next();
};

module.exports = {
	authorized,
};

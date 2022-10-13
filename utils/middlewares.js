const authorized = function (req, res, next) {
	if (!res.locals.isLoggedIn) {
		res.redirect('/auth/login');
	}

	next();
};

const pagination = function (req, res, next) {
	res.locals.page = req.query.page ? +req.query.page : 0;

	next();
};

module.exports = {
	authorized,
	pagination,
};

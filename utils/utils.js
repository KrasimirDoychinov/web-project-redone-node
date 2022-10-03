const redirect = function (res, status, route, obj) {
	res.redirect(route, status, obj);
};

module.exports = {
	redirect,
};

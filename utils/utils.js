const redirect = function (res, route, obj) {
	res.redirect(route, 300, obj);
};

module.exports = {
	redirect,
};

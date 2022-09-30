const redirect = function (res, route, obj) {
	res.redirect(route, 300, obj);
};

const setTitle = function (req, res, next) {
	const splitUrl = req.url.split('/').filter((x) => x.trim() != '');
	const builtUrl =
		splitUrl[splitUrl.length - 1].charAt(0).toUpperCase() +
		splitUrl[splitUrl.length - 1].slice(1).toLowerCase();
		
	res.locals = {
		title: req.url.length == 0 ? 'Home' : builtUrl,
	};
	next();
};

module.exports = {
	redirect,
	setTitle,
};

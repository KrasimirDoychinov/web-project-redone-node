const sessionService = require('../services/sessionServices');
const userService = require('../services/userServices');

const registerView = function (req, res) {
	res.render('./auth/register');
};

const loginView = function (req, res) {
	res.render('./auth/login');
};

const registerUser = async function (req, res) {
	const { name, password, confirm } = req.body;
	const data = await userService.register(name, password, confirm);

	if (data.error) {
		res.render('./auth/register', { data });
		return;
	}

	await userService.login(name, password, req.session);
	res.redirect('/');
};

const loginUser = async function (req, res) {
	const { name, password } = req.body;
	const data = await userService.login(name, password, req.session);

	if (data.error) {
		res.render('./auth/login', { data });
		return;
	}

	res.redirect('/');
};

const logoutUser = function (req, res) {
	sessionService.destroySession(req.session);
	res.redirect('/');
};

module.exports = {
	registerView,
	loginView,
	registerUser,
	loginUser,
	logoutUser,
};

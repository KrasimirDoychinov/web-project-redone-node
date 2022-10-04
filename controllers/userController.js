const { destroySession } = require('../services/sessionServices');
const {
	registerUserService,
	loginUserService,
} = require('../services/userServices');

const registerView = function (req, res) {
	res.render('./auth/register');
};

const loginView = function (req, res) {
	res.render('./auth/login');
};

const registerUser = async function (req, res) {
	const { name, password, confirm } = req.body;
	const data = await registerUserService(name, password, confirm);

	if (data.error) {
		res.render('register', { data });
		return;
	}

	res.redirect('/');
};

const loginUser = async function (req, res) {
	const { name, password } = req.body;
	const data = await loginUserService(name, password, req.session);

	if (data.error) {
		res.render('login', { data });
		return;
	}

	res.redirect('/');
};

const logoutUser = function (req, res) {
	destroySession(req.session);
	res.redirect('/');
};

module.exports = {
	registerView,
	loginView,
	registerUser,
	loginUser,
	logoutUser,
};

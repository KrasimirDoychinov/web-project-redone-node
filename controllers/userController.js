const {
	registerUserService,
	loginUserService,
} = require('../services/userServices');

const registerView = function (req, res) {
	res.render('register');
};

const loginView = function (req, res) {
	res.render('login');
};

const registerUser = async function (req, res) {
	await registerUserService(req, res);
};

const loginUser = async function (req, res) {
	await loginUserService(req, res);
};

module.exports = {
	registerView,
	loginView,
	registerUser,
	loginUser,
};

const User = require('../models/User');
const bcrypt = require('bcrypt');
const { redirect } = require('../utils/utils');

const registerView = function (req, res) {
	res.render('register', { title: 'Register' });
};

const loginView = function (req, res) {
	res.render('login', { title: 'Login' });
};

const registerUser = async function (req, res) {
	const { name, password, confirm } = req.body;
	if (!name || !password || !confirm) {
		redirect(res, '/user/register', { title: 'Register' });
		return;
	}

	if (password !== confirm) {
		redirect(res, '/user/register', { title: 'Register' });
		return;
	}

	const user = await User.findOne({ name: name });
	if (user) {
		console.log('User already exists');

		redirect(res, '/user/register', { title: 'Register' });
		return;
	}

	const newUser = new User({
		name,
		password,
	});

	const hash = await bcrypt.hash(newUser.password);

	newUser.password = hash;
	newUser
		.save()
		.then(res.redirect('/user/login'))
		.catch((err) => console.log(err));
};

const loginUser = async function (req, res) {
	const { name, password } = req.body;

	const foundUser = await User.findOne({ name: name });
	if (!foundUser) {
		redirect(res, '/user/login', { title: 'Login' });
		return;
	}

	const passwordsMatch = await bcrypt.compare(password, foundUser.password);
	if (!passwordsMatch) {
		redirect(res, '/user/login', { title: 'Login' });
		console.log("Hashes don't match");
		return;
	}

	console.log(`Successfuly login in ${foundUser.name}`);
	redirect(res, '/user/register', { title: 'Register' });
};

module.exports = {
	registerView,
	loginView,
	registerUser,
	loginUser,
};

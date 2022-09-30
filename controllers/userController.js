const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerView = function (req, res) {
	res.render('register', { title: 'Register' });
};

const loginView = function (req, res) {
	res.render('login', { title: 'Login' });
};

const registerUser = async function (req, res) {
	const redirectBackToRegister = function (res) {
		res.render('register', {
			title: 'Register',
		});
	};

	const { name, password, confirm } = req.body;
	if (!name || !password || !confirm) {
		redirectBackToRegister(res);
		return;
	}

	if (password !== confirm) {
		redirectBackToRegister(res);
		return;
	}

	const user = await User.findOne({ name: name });
	if (user) {
		console.log('User already exists');

		redirectBackToRegister(res);
		return;
	}

	const newUser = new User({
		name,
		password,
	});

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(newUser.password, salt);

	newUser.password = hash;
	newUser
		.save()
		.then(res.redirect('/user/login'))
		.catch((err) => console.log(err));
};

module.exports = {
	registerView,
	loginView,
	registerUser,
};

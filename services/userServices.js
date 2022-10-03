const { redirect } = require('../utils/utils');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { requiredFields } = require('../utils/consts');

const registerUserService = async function (req, res) {
	const { name, password, confirm } = req.body;
	if (!name || !password || !confirm) {
		res.render('register', {
			data: { name, password, confirm, generalErrMsg: requiredFields },
		});
		return;
	}

	const user = await User.findOne({ name: name });
	if (user) {
		res.render('register', {
			data: {
				name,
				password,
				confirm,
				generalErrMsg: 'User already exists with that name.',
			},
		});
		return;
	}

	if (password !== confirm) {
		res.render('register', {
			data: {
				name,
				password,
				confirm,
				confirmErrMsg: 'Both passwords must match.',
			},
		});
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
		.then(res.redirect('/'))
		.catch((err) => console.log(err));
};

const loginUserService = async function (req, res) {
	const { name, password } = req.body;

	if (!name || !password) {
		res.render('login', {
			data: {
				name,
				password,
				generalErrMsg: requiredFields,
			},
		});
	}

	const foundUser = await User.findOne({ name: name });
	if (!foundUser) {
		res.render('login', {
			data: {
				name,
				password,
				nameErrMsg: "User with this name wasn't found.",
			},
		});
		return;
	}

	const passwordsMatch = await bcrypt.compare(password, foundUser.password);
	if (!passwordsMatch) {
		res.render('login', {
			data: {
				name,
				password,
				passErrMsg: 'The password is incorrect.',
			},
		});
		return;
	}

	console.log(`Successfuly login in ${foundUser.name}`);
	redirect(res, 300, '/');
};

module.exports = {
	registerUserService,
	loginUserService,
};

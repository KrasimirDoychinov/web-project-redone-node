const { redirect } = require('../utils/utils');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUserService = async function (req, res) {
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

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(newUser.password, salt);

	newUser.password = hash;
	newUser
		.save()
		.then(redirect(res, '/user/login', { title: 'Register' }))
		.catch((err) => console.log(err));
};

const loginUserService = async function (req, res) {
	const { name, password } = req.body;

	const foundUser = await User.findOne({ name: name });
	if (!foundUser) {
		res.render('login', {
			data: { name, password, nameErr: true },
		});
		return;
	}

	const passwordsMatch = await bcrypt.compare(password, foundUser.password);
	if (!passwordsMatch) {
		res.render('login', { data: { name, password, passErr: true } });
		return;
	}

	console.log(`Successfuly login in ${foundUser.name}`);
	redirect(res, 300, '/');
};

module.exports = {
	registerUserService,
	loginUserService,
};

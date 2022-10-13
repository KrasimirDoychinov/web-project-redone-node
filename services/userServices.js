const User = require('../models/User');
const bcrypt = require('bcrypt');
const { requiredFieldsMsg, internalErrorMsg } = require('../utils/consts');
const { saveSessionUser } = require('./sessionServices');
const { userConstrains } = require('../utils/constraints');
const { buildConstraintError } = require('./errorEngine');

const createUser = async function (name, password) {
	const newUser = new User({
		name,
		password,
		createdOn: new Date(),
	});

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(newUser.password, salt);

	newUser.password = hash;
	try {
		await newUser.save();
		return true;
	} catch (error) {
		return false;
	}
};

const registerUserService = async function (name, password, confirm) {
	const data = { name, password, confirm };
	if (!name || !password || !confirm) {
		data.error = requiredFieldsMsg;
		return data;
	}

	const user = await User.findOne({ name: name });
	if (user) {
		data.error = 'User already exists with that name.';
		return data;
	}

	if (password !== confirm) {
		data.error = 'Both passwords must match.';
		return data;
	}

	if (
		name.length < userConstrains.nameMinLength ||
		name.length > userConstrains.nameMaxLength
	) {
		data.error = buildConstraintError(
			'Name',
			userConstrains.nameMinLength,
			userConstrains.nameMaxLength
		);
		return data;
	}

	if (
		password.length < userConstrains.passMinLength ||
		password.length > userConstrains.passMaxLength
	) {
		data.error = buildConstraintError(
			'Password',
			userConstrains.passMinLength,
			userConstrains.passMaxLength
		);
		return data;
	}

	if (!(await createUser(name, password))) {
		data.error = internalErrorMsg;
		return data;
	}
	return data;
};

const loginUserService = async function (name, password, session) {
	const data = { name, password, error: false };
	if (!name || !password) {
		data.error = requiredFieldsMsg;
		return data;
	}

	const foundUser = await User.findOne({ name: name });
	if (!foundUser) {
		data.error = "User with this name wasn't found.";
		return data;
	}

	const passwordsMatch = await bcrypt.compare(password, foundUser.password);
	if (!passwordsMatch) {
		data.error = 'The password is incorrect.';
		return data;
	}

	saveSessionUser(session, {
		name: foundUser.name,
		id: foundUser.id,
		imageUrl: foundUser.imageUrl,
	});
	console.log(`Successfuly login in ${foundUser.name}`);
	return data;
};

const updateUserAvatar = async function (user, imageUrl) {
	try {
		const dbUser = await User.findById(user.id);
		dbUser.imageUrl = imageUrl;

		await dbUser.save();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	registerUserService,
	loginUserService,
	createUser,
	updateUserAvatar,
};

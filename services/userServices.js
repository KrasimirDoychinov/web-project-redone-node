const User = require('../models/User');
const bcrypt = require('bcrypt');
const { requiredFieldsMsg, internalErrorMsg } = require('../utils/consts');
const { saveSessionUser } = require('./sessionServices');

const createUser = async function (name, password) {
	const newUser = new User({
		name,
		password,
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
	const data = { name, password, confirm, error: false };
	if (!name || !password || !confirm) {
		data.error = true;
		data.generalErrMsg = requiredFieldsMsg;
		return data;
	}

	const user = await User.findOne({ name: name });
	if (user) {
		data.error = true;
		data.generalErrMsg = 'User already exists with that name.';
		return data;
	}

	if (password !== confirm) {
		data.error = true;
		data.confirmErrMsg = 'Both passwords must match.';
		return data;
	}

	if (!(await createUser(name, password))) {
		data.error = true;
		data.generalErrMsg = internalErrorMsg;
	}
	return data;
};

const loginUserService = async function (name, password, session) {
	const data = { name, password, error: false };
	if (!name || !password) {
		data.error = true;
		data.generalErrMsg = requiredFieldsMsg;
		return data;
	}

	const foundUser = await User.findOne({ name: name });
	if (!foundUser) {
		data.error = true;
		data.nameErrMsg = "User with this name wasn't found.";
		return data;
	}

	const passwordsMatch = await bcrypt.compare(password, foundUser.password);
	if (!passwordsMatch) {
		data.error = true;
		data.passErrMsg = 'The password is incorrect.';
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

module.exports = {
	registerUserService,
	loginUserService,
	createUser,
};

const User = require('./User');
const bcrypt = require('bcrypt');
const { requiredFieldsMsg, internalErrorMsg } = require('../../utils/consts');
const { saveSessionUser } = require('../utils/sessionServices');
const { userConstrains } = require('../../utils/constraints');
const { buildConstraintError } = require('../errorEngine/errorEngine');
const sessionService = require('../utils/sessionServices');

const create = async function (name, password) {
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

const register = async function (name, password, confirm) {
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

	if (!(await userService.create(name, password))) {
		data.error = internalErrorMsg;
		return data;
	}
	return data;
};

const login = async function (name, password, session) {
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

	sessionService.saveUser(session, {
		name: foundUser.name,
		id: foundUser.id,
		imageUrl: foundUser.imageUrl,
		forumSignature: foundUser.forumSignature,
	});
	console.log(`Successfuly login in ${foundUser.name}`);
	return data;
};

const updateAvatar = async function (user, imageUrl) {
	try {
		const dbUser = await User.findById(user.id);
		dbUser.imageUrl = imageUrl;

		await dbUser.save();
		return {
			name: dbUser.name,
			id: dbUser.id,
			imageUrl: dbUser.imageUrl,
			forumSignature: dbUser.forumSignature,
		};
	} catch (error) {
		console.log(error);
	}
};

const updateSignature = async function (id, forumSignature) {
	if (forumSignature.length > userConstrains.forumSignatureMaxLength) {
		throw new Error(
			`Forum signature cannot be over ${userConstrains.forumSignatureMaxLength} symbols.`
		);
	}

	const user = await User.findById(id);
	user.forumSignature = forumSignature;

	await user.save();

	return {
		name: user.name,
		id: user.id,
		imageUrl: user.imageUrl,
		forumSignature: user.forumSignature,
	};
};

const userService = {
	create,
	register,
	login,
	updateAvatar,
	updateSignature,
};

module.exports = userService;

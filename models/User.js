const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			default: '../static/images/avatar-knight.jpg',
		},
		createdOn: {
			type: Date,
			required: true,
		},
		forumSignature: {
			type: String,
			required: false,
		},
	},
	{ collection: 'users' }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;

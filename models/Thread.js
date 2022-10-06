const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		baseThreadId: {
			type: String,
			required: true,
		},
		creatorName: {
			type: String,
			required: true,
		},
		creatorImageUrl: {
			type: String,
			required: true,
		},
		createdOn: {
			type: Date,
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ collection: 'threads' }
);

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;

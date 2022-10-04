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
		creatorId: {
			type: String,
			required: true,
		},
	},
	{ collection: 'thread' }
);

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;

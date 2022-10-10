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
		creator: {
			name: {
				type: String,
				required: true,
			},
			imageUrl: {
				type: String,
				required: true,
			},
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

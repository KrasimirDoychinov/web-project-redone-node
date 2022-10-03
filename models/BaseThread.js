const mongoose = require('mongoose');

const BaseThreadSchema = new mongoose.Schema(
	{
		isDeleted: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
	},
	{ collection: 'baseThreads' }
);

const BaseThread = mongoose.model('BaseThread', BaseThreadSchema);
module.exports = BaseThread;

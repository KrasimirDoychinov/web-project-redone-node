const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		link: {
			type: String,
			required: true,
		},
		time: {
			type: Date,
			required: true,
		},
	},
	{ collection: 'news' }
);

const News = mongoose.model('News', NewsSchema);

module.exports = News;

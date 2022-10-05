const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		description: {
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
		threadId: {
			type: String,
			required: true,
		},
	},
	{ collection: 'posts' }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

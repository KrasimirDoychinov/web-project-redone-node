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
		createdOn: {
			type: Date,
			requird: true,
		},
		votes: {
			type: Number,
			default: 0,
		},
	},
	{ collection: 'posts' }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

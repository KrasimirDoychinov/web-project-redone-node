const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		description: {
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

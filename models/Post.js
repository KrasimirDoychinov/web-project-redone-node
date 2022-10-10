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
			id: {
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
		votes: [
			{
				id: {
					type: String,
					required: true,
				},
				type: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ collection: 'posts' }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

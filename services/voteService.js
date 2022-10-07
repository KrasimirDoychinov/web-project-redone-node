const Post = require('../models/Post');

const vote = async function (postId, type) {
	const post = await Post.findById(postId);

	switch (type) {
		case 'upvote':
			post.votes++;
			break;
		case 'downvote':
			post.votes--;
			break;
		default:
			break;
	}

	await post.save();
	return post.votes;
};

module.exports = {
	vote,
};

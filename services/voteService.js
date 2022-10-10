const { getPostById } = require('./postServices');

const vote = async function (postId, userId, type) {
	const post = await getPostById(postId);
	const userVoted = post.votes.find((x) => x.id === userId);

	if (!userVoted) {
		post.votes.push({ id: userId, type });
		await post.save();
		return post;
	}

	if (!userVoted || userVoted.type === type) {
		return post;
	}

	if (userVoted.type !== type) {
		post.votes.find((x) => x.id === userId).type = type;
		await post.save();
		return post;
	}
};

module.exports = {
	vote,
};

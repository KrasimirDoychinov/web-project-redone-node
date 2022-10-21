const postServices = require('../post/postServices');

const vote = async function (postId, userId, type) {
	const post = await postServices.getById(postId);
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

const voteService = { vote };

module.exports = voteService;

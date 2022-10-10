const { getPostById } = require('./postServices');

const vote = async function (postId, userId, type) {
	const post = await getPostById(postId);
	const userVoted = post.votes.find((x) => x.id === userId);

	if (!userVoted) {
		post.votes.push({ id: userId, type });
		await post.save();
		return getVotes(post);
	}

	if (!userVoted || userVoted.type === type) {
		return getVotes(post);
	}

	if (userVoted.type !== type) {
		post.votes.find((x) => x.id === userId).type = type;
		await post.save();
		return getVotes(post);
	}
};

const getVotes = function (post) {
	const votes =
		post.votes.filter((x) => x.type === 'upvote').length -
		post.votes.filter((x) => x.type === 'downvote').length;

	console.log(votes);
	return votes;
};

module.exports = {
	vote,
};

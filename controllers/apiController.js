const { getVotes } = require('../services/postServices');
const { vote } = require('../services/voteService');

const votes = async function (req, res) {
	const { postId, voteType } = req.body;
	console.log(postId);
	const userId = res.locals.user.id;
	try {
		const post = await vote(postId, userId, voteType);
		const newVotes = getVotes(post);
		res.send({ success: true, newVotes });
	} catch (error) {
		console.log(error);
		res.send({ success: false, error });
	}
};

module.exports = {
	votes,
};

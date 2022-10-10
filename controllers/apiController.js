const { vote } = require('../services/voteService');

const votes = async function (req, res) {
	const { postId, voteType } = req.body;
	const userId = res.locals.user.id;
	try {
		const newVotes = await vote(postId, userId, voteType);
		res.send({ success: true, newVotes });
	} catch (error) {
		res.send({ success: false, error });
	}
};

module.exports = {
	votes,
};

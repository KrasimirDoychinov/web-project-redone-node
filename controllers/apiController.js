const { getVotes, updateDescription } = require('../services/postServices');
const { vote } = require('../services/voteService');

const votes = async function (req, res) {
	const { postId, voteType } = req.body;
	const userId = res.locals.user.id;
	try {
		const post = await vote(postId, userId, voteType);
		const newVotes = getVotes(post);
		res.send({ success: true, newVotes });
	} catch (error) {
		res.send({ success: false, error });
	}
};

const updatePost = async function (req, res) {
	const { postId, description } = req.body;
	try {
		await updateDescription(postId, description);
		res.send({ success: true });
	} catch (error) {
		res.send({ success: false, error });
	}
};

module.exports = {
	votes,
	updatePost,
};

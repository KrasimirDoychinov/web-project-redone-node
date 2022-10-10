const { getVotes, updateDescription } = require('../services/postServices');
const { updateThreadDescription } = require('../services/threadServices');
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
	const { id, description } = req.body;
	try {
		await updateDescription(id, description);
		res.send({ success: true });
	} catch (error) {
		res.send({ success: false, error });
	}
};

const updateThread = async function (req, res) {
	const { id, description } = req.body;
	try {
		await updateThreadDescription(id, description);
		res.send({ success: true });
	} catch (error) {
		res.send({ success: false, error });
	}
};

module.exports = {
	votes,
	updatePost,
	updateThread,
};

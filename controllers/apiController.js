const { getVotes, updateDescription } = require('../services/postServices');
const { updateThreadDescription } = require('../services/threadServices');
const { updateUserAvatar } = require('../services/userServices');
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

const updateAvatar = async function (req, res) {
	const { url } = req.body;
	const user = res.locals.user;

	try {
		await updateUserAvatar(user,  url);
		res.send({ success: true, url: url });
	} catch (error) {
		res.send({ success: false, error });
	}
};

module.exports = {
	votes,
	updatePost,
	updateThread,
	updateAvatar,
};

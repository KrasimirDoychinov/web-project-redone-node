const {
	getVotes,
	updateDescription,
	updateCreatorImage,
} = require('../services/postServices');
const { saveSessionUser } = require('../services/sessionServices');
const {
	updateThreadDescription,
	updateThreadCreatorImageUrl,
} = require('../services/threadServices');
const {
	updateUserAvatar,
	updateSignature,
} = require('../services/userServices');
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
		const newSessionUser = await updateUserAvatar(user, url);
		await saveSessionUser(req.session, newSessionUser);

		await updateCreatorImage(user.id, url);
		await updateThreadCreatorImageUrl(user.id, url);
		res.send({ success: true, url: url });
	} catch (error) {
		res.send({ success: false, error });
	}
};

const updateForumSignature = async function (req, res) {
	const { forumSignature } = req.body;
	const user = res.locals.user;

	try {
		const newSessionUser = await updateSignature(user.id, forumSignature);
		await saveSessionUser(req.session, newSessionUser);

		res.send({ success: true });
	} catch (error) {
		res.send({ success: false, error: error.message });
	}
};
module.exports = {
	votes,
	updatePost,
	updateThread,
	updateAvatar,
	updateForumSignature,
};

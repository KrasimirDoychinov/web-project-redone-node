const postServices = require('../services/postServices');
const sessionService = require('../services/sessionServices');
const threadServices = require('../services/threadServices');
const userService = require('../services/userServices');
const voteService = require('../services/voteService');

const votes = async function (req, res) {
	const { postId, voteType } = req.body;
	const userId = res.locals.user.id;
	try {
		const post = await voteService.vote(postId, userId, voteType);
		const newVotes = postServices.getVotes(post);
		res.send({ success: true, newVotes });
	} catch (error) {
		res.send({ success: false, error });
	}
};

const updatePost = async function (req, res) {
	const { id, description } = req.body;
	try {
		console.log('testr');
		await postServices.updateDescription(id, description);
		res.send({ success: true });
	} catch (error) {
		console.log(error.message);
		res.send({ success: false, error });
	}
};

const updateThread = async function (req, res) {
	const { id, description } = req.body;
	try {
		await threadServices.updateDescription(id, description);
		res.send({ success: true });
	} catch (error) {
		res.send({ success: false, error });
	}
};

const updateAvatar = async function (req, res) {
	const { url } = req.body;
	const user = res.locals.user;

	try {
		const newSessionUser = await userService.updateAvatar(user, url);
		await sessionService.saveUser(req.session, newSessionUser);

		await postServices.updateCreatorImage(user.id, url);
		await threadServices.updateCreatorImage(user.id, url);
		res.send({ success: true, url: url });
	} catch (error) {
		res.send({ success: false, error });
	}
};

const updateForumSignature = async function (req, res) {
	const { forumSignature } = req.body;
	const user = res.locals.user;

	try {
		const newSessionUser = await userService.updateSignature(
			user.id,
			forumSignature
		);
		await sessionService.saveUser(req.session, newSessionUser);

		await postServices.updateCreatorSignature(user.id, forumSignature);
		await threadServices.updateCreatorSignature(user.id, forumSignature);
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

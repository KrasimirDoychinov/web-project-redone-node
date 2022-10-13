const postServices = require('../services/postServices');
const threadServices = require('../services/threadServices');

const createPost = async function (req, res) {
	const { description, threadId } = req.body;
	const creator = res.locals.user;

	const thread = await threadServices.getById(threadId);
	const data = await postServices.create(description, thread, creator);

	if (data.error) {
		res.redirect(`/thread/${thread.id}?error=${data.error}`);
		return;
	}

	res.redirect(`/thread/${thread.id}?page=0`);
};

const deletePost = async function (req, res) {
	const postId = req.params.id;
	const { threadId } = req.query;

	await postServices.deleteById(postId);
	res.redirect(`/thread/${threadId}`);
};

module.exports = {
	createPost,
	deletePost,
};

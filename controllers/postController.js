const {
	createPostService,
	deletePostService,
} = require('../services/postServices');

const createPost = async function (req, res) {
	const { description, threadId } = req.body;
	const creator = res.locals.user;
	const data = await createPostService(description, threadId, creator);

	if (data.error) {
		res.redirect(`/thread/${threadId}?error=${data.error}`);
		return;
	}

	res.redirect(`/thread/${threadId}`);
};

const deletePost = async function (req, res) {
	const postId = req.params.id;
	const { threadId } = req.query;

	await deletePostService(postId);
	res.redirect(`/thread/${threadId}`);
};
module.exports = {
	createPost,
	deletePost,
};

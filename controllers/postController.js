const { createPostService } = require('../services/postServices');
const { getUserId } = require('../services/sessionServices');

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

module.exports = {
	createPost,
};

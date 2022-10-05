const { getPostsByThreadId } = require('../services/postServices');
const { getUserId } = require('../services/sessionServices');
const {
	createThreadService,
	getThreadById,
} = require('../services/threadServices');

const createThreadView = function (req, res) {
	res.render('./threads/create', { data: { baseId: req.query.baseId } });
};

const createThread = async function (req, res) {
	const { title, description, baseId } = req.body;
	const creator = res.locals.user;

	const data = await createThreadService(title, description, baseId, creator);

	if (data.error) {
		res.redirect(`/baseThread/${baseId}?error=${data.error}`);
		return;
	}

	res.redirect(`/baseThread/${baseId}`);
};

const threadView = async function (req, res) {
	const thread = await getThreadById(req.params.id);
	const posts = await getPostsByThreadId(req.params.id);

	console.log(thread);
	const user = req.session.user;
	res.render('./threads/thread', { data: { thread, user, posts } });
};

module.exports = {
	createThreadView,
	createThread,
	threadView,
};

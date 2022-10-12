const { getPostsByThreadId } = require('../services/postServices');
const {
	createThreadService,
	getThreadById,
	increaseViewCount,
	deleteThreadById,
} = require('../services/threadServices');

const createThreadView = function (req, res) {
	res.render('./threads/create', { data: { baseId: req.query.baseId } });
};

const createThread = async function (req, res) {
	const { title, description, baseId, page } = req.body;
	const creator = res.locals.user;

	const data = await createThreadService(title, description, baseId, creator);

	if (data.error) {
		res.redirect(`/baseThread/${baseId}?error=${data.error}&page=${page}`);
		return;
	}

	res.redirect(`/baseThread/${baseId}?page=${page}`);
};

const threadView = async function (req, res) {
	let { page } = req.query;
	page = page ? +page : 0;
	const thread = await getThreadById(req.params.id);
	const posts = await getPostsByThreadId(req.params.id, page);
	await increaseViewCount(thread.id);

	const user = req.session.user;
	res.render('./threads/thread', {
		data: { thread, user, posts, page },
	});
};

const deleteThread = async function (req, res) {
	const threadId = req.params.id;
	const { baseId } = req.query;
	await deleteThreadById(threadId);
	res.redirect(`/baseThread/${baseId}?page=0`);
};

module.exports = {
	createThreadView,
	createThread,
	threadView,
	deleteThread,
};

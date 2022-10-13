const postServices = require('../services/postServices');
const threadServices = require('../services/threadServices');

const createThreadView = function (req, res) {
	res.render('./threads/create', { data: { baseId: req.query.baseId } });
};

const createThread = async function (req, res) {
	const { title, description, baseId, page } = req.body;
	const creator = res.locals.user;

	const data = await threadServices.create(title, description, baseId, creator);

	if (data.error) {
		res.redirect(`/baseThread/${baseId}?error=${data.error}&page=${page}`);
		return;
	}

	res.redirect(`/baseThread/${baseId}?page=${page}`);
};

const threadView = async function (req, res) {
	const thread = await threadServices.getById(req.params.id);
	const posts = await postServices.allByThreadId(
		req.params.id,
		res.locals.page
	);
	await threadServices.increaseViewCount(thread.id);

	const user = req.session.user;
	res.render('./threads/thread', {
		data: { thread, user, posts },
	});
};

const deleteThread = async function (req, res) {
	const threadId = req.params.id;
	const { baseId } = req.query;
	await threadServices.deleteById(threadId);
	res.redirect(`/baseThread/${baseId}?page=0`);
};

module.exports = {
	createThreadView,
	createThread,
	threadView,
	deleteThread,
};

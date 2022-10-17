const postServices = require('../services/postServices');
const threadServices = require('../services/threadServices');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

TimeAgo.addDefaultLocale(en);

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
	const threadId = req.params.id;
	const timeAgo = new TimeAgo('en-US');

	const thread = await threadServices.getById(threadId);
	const posts = await postServices.allByThreadId(threadId, res.locals.page);
	const popularPosts = await postServices.getPopularPostsByThreadId(threadId);
	const topPosters = await postServices.getTopPostersByThreadId(threadId);

	const timestamp =
		posts.length > 0
			? new Date(Math.abs(Date.now() - posts[posts.length - 1]?.createdOn))
			: 0;

	const replyAgo =
		timestamp === 0 ? 'No replies' : timeAgo.format(Date.now() - timestamp);

	await threadServices.increaseViewCount(thread.id);

	const user = req.session.user;
	res.render('./threads/thread', {
		data: { thread, user, posts, replyAgo, popularPosts, topPosters },
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

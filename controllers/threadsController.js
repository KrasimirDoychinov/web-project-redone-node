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
	const creatorId = getUserId(req.session);

	const data = await createThreadService(title, description, baseId, creatorId);

	if (data.error) {
		res.redirect(`/baseThread/${baseId}?err=${data.generalErrMsg}`);
		return;
	}

	res.redirect(`/baseThread/${baseId}`);
};

const threadView = async function (req, res) {
	const thread = await getThreadById(req.params.id);
	const user = req.session.user;
	console.log(thread);
	res.render('./threads/thread', { data: { thread, user } });
};

module.exports = {
	createThreadView,
	createThread,
	threadView,
};

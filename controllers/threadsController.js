const { getUserId } = require('../services/sessionServices');
const { createThreadService } = require('../services/threadServices');

const createThreadView = function (req, res) {
	res.render('./threads/create', { data: { baseId: req.query.baseId } });
};

const createThread = async function (req, res) {
	const { title, description, baseId } = req.body;
	const creatorId = getUserId(req.session);

	const data = await createThreadService(title, description, baseId, creatorId);

	if (data.error) {
		res.render('./thread/create');
		return;
	}

	res.redirect(`/baseThread/${baseId}`);
};

module.exports = {
	createThreadView,
	createThread,
};

const { getBaseThreadById } = require('../services/baseThreadServices');
const { getAllThreadsByBaseThread } = require('../services/threadServices');

const baseThreadByIdView = async function (req, res) {
	const baseThread = await getBaseThreadById(req.params.id);
	const threads = await getAllThreadsByBaseThread(req.params.id);
	res.render('baseThread', { data: { threads, baseThread } });
};

module.exports = {
	baseThreadByIdView,
};

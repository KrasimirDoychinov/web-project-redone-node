const { getBaseThreadById } = require('../services/baseThreadServices');
const { getAllThreadsByBaseThread } = require('../services/threadServices');

const baseThreadByIdView = async function (req, res) {
	const generalErrMsg = req.query.err;
	const baseThread = await getBaseThreadById(req.params.id);
	const threads = await getAllThreadsByBaseThread(req.params.id);
	res.render('baseThread', { data: { threads, baseThread, generalErrMsg } });
};

module.exports = {
	baseThreadByIdView,
};

const { getBaseThreadById } = require('../services/baseThreadServices');
const { getAllThreadsByBaseThread } = require('../services/threadServices');

const baseThreadByIdView = async function (req, res) {
	const baseThread = await getBaseThreadById(req.params.id);
	const threads = await getAllThreadsByBaseThread(
		req.params.id,
		req.query.page
	);

	res.render('baseThread', {
		data: { ...res.locals.data, threads, baseThread, page: req.query.page },
	});
};

module.exports = {
	baseThreadByIdView,
};

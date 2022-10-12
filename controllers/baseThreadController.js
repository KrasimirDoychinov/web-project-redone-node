const { getBaseThreadById } = require('../services/baseThreadServices');
const { getAllThreadsByBaseThread } = require('../services/threadServices');

const baseThreadByIdView = async function (req, res) {
	let { page } = req.query;
	page = page ? +page : 0;
	const baseThread = await getBaseThreadById(req.params.id);
	const threads = await getAllThreadsByBaseThread(
		req.params.id,
		req.query.page
	);

	res.render('baseThread', {
		data: { ...res.locals.data, threads, baseThread, page },
	});
};

module.exports = {
	baseThreadByIdView,
};

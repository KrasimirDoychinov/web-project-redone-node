const baseThreadService = require('../services/baseThreadServices');
const threadServices = require('../services/threadServices');

const baseThreadByIdView = async function (req, res) {
	const baseThread = await baseThreadService.getById(req.params.id);
	const threads = await threadServices.allByBase(
		req.params.id,
		res.locals.page
	);

	res.render('baseThread', {
		data: { ...res.locals.data, threads, baseThread },
	});
};

module.exports = {
	baseThreadByIdView,
};

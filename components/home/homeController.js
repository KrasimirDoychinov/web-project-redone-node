const baseThreadService = require('../baseThread/baseThreadServices');

const homeView = async function (req, res) {
	const baseThreads = await baseThreadService.all();
	res.render('index', { data: { baseThreads } });
};

module.exports = {
	homeView,
};

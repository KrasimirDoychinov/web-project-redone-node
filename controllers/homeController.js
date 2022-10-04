const BaseThread = require('../models/BaseThread');
const { checkForSessionValue } = require('../services/sessionServices');

const homeView = async function (req, res) {
	const baseThreads = await BaseThread.find({});
	res.render('index', { data: { baseThreads } });
};

module.exports = {
	homeView,
};

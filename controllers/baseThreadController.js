const { getBaseThreadById } = require('../services/baseThreadServices');

const baseThreadByIdView = async function (req, res) {
	const baseThread = await getBaseThreadById(req.params.id);
	res.render('baseThread', { data: baseThread });
};

module.exports = {
	baseThreadByIdView,
};

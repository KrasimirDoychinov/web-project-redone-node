const BaseThread = require('../models/BaseThread');

const create = function (title, description, imageUrl) {
	const newBaseThread = new BaseThread({
		title,
		description,
		imageUrl,
	});

	newBaseThread.save();
};

const getById = async function (id) {
	const baseThread = await BaseThread.findById(id);

	return baseThread;
};

const all = async function () {
	return await BaseThread.find({});
};

const baseThreadService = {
	create,
	getById,
	all,
};

module.exports = baseThreadService;

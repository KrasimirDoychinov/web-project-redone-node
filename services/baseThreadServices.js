const BaseThread = require('../models/BaseThread');

const createBaseThread = function (title, description, imageUrl) {
	const newBaseThread = new BaseThread({
		title,
		description,
		imageUrl,
	});

	newBaseThread.save().catch((err) => console.log(err));
};

module.exports = {
	createBaseThread,
};

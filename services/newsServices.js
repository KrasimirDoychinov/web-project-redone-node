const News = require('../models/News');

const getUnique = async function (data) {
	let result = [];
	for (const x of data) {
		const found = await News.findOne({ link: x.link });
		if (!found) {
			result.push(x);
		}
	}

	return result;
};

module.exports = {
	getUnique,
};

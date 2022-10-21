const News = require('./News');

const unique = async function (data) {
	let result = [];
	for (const x of data) {
		const found = await News.findOne({ link: x.link });
		if (!found) {
			result.push(x);
		}
	}

	return result;
};

const all = async function () {
	const news = await News.find({}).sort({ time: -1 }).limit(10);

	return news;
};

const newsService = {
	unique,
	all,
};

module.exports = newsService;

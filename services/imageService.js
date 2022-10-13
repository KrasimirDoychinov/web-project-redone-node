const cloudinary = require('cloudinary');

const allAvatars = async function () {
	const result = (await cloudinary.api.resources({ folder: 'swtor' })).resources
		.map((x) => x.url)
		.filter((x) => x.includes('avatar'));

	return result;
};

const imageService = {
	allAvatars,
};

module.exports = imageService;

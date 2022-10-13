const cloudinary = require('cloudinary');

const getAllAvatars = async function () {
	const result = (await cloudinary.api.resources({ folder: 'swtor' })).resources
		.map((x) => x.url)
		.filter((x) => x.includes('avatar'));

	return result;
};

module.exports = {
	getAllAvatars,
};

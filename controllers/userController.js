const imageService = require('../services/imageService');
const postServices = require('../services/postServices');

const profileView = async function (req, res) {
	const { user } = res.locals;
	user.posts = await postServices.allByCreatorId(user.id);
	const avatars = await imageService.allAvatars();

	res.render('./user/profile', { data: { avatars } });
};

module.exports = {
	profileView,
};

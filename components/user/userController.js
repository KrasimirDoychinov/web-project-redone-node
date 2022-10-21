const imageService = require('../images/imageService');
const postServices = require('../post/postServices');

const profileView = async function (req, res) {
	const { user } = res.locals;
	user.posts = await postServices.allByCreatorId(user.id);
	const avatars = await imageService.allAvatars();

	res.render('./user/profile', { data: { avatars } });
};

module.exports = {
	profileView,
};

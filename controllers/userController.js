const { getAllAvatars } = require('../services/imageService');
const { getPostsByCreatorId } = require('../services/postServices');

const profileView = async function (req, res) {
	const { user } = res.locals;
	user.posts = await getPostsByCreatorId(user.id);
	const avatars = await getAllAvatars();

	res.render('./user/profile', { data: { avatars } });
};

module.exports = {
	profileView,
};

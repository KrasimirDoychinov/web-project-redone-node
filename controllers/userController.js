const { getPostsByCreatorId } = require('../services/postServices');

const profileView = async function (req, res) {
	const { user } = res.locals;
	user.posts = await getPostsByCreatorId(user.id);

	res.render('./user/profile');
};

module.exports = {
	profileView,
};

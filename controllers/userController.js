const { getPostsByCreatorId } = require('../services/postServices');

const profileView = async function (req, res) {
	const { user } = res.locals;
	user.posts = await getPostsByCreatorId(user.id);

	console.log(user.posts);
	res.render('./user/profile');
};

module.exports = {
	profileView,
};

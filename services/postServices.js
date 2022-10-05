const Post = require('../models/Post');
const { postConstraints } = require('../utils/constraints');
const { requiredFieldsMsg } = require('../utils/consts');
const { buildConstraintError } = require('./errorEngine');

const createPostService = async function (description, threadId, creator) {
	const data = { description };
	if (!description || !threadId || !creator) {
		data.error = requiredFieldsMsg;
		return data;
	}

	if (
		description.length < postConstraints.descriptionMinLength ||
		description.length > postConstraints.descriptionMaxLength
	) {
		data.error = buildConstraintError(
			'Post',
			postConstraints.descriptionMinLength,
			postConstraints.descriptionMaxLength
		);
		return data;
	}

	const newPost = new Post({
		description,
		threadId,
		creatorImageUrl: creator.imageUrl,
		creatorName: creator.name,
	});

	try {
		await newPost.save();
	} catch (error) {
		data.error = error;
		return data;
	}

	return data;
};

const getPostsByThreadId = async function (threadId) {
	const posts = await Post.find({ threadId: threadId });

	return posts;
};

module.exports = {
	createPostService,
	getPostsByThreadId,
};

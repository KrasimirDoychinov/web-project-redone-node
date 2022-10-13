const Post = require('../models/Post');
const { postConstraints } = require('../utils/constraints');
const { requiredFieldsMsg } = require('../utils/consts');
const { buildConstraintError } = require('./errorEngine');

const getPostById = async function (id) {
	const post = await Post.findById(id);

	return post;
};

const updateDescription = async function (id, description) {
	const post = await getPostById(id);
	post.description = description;

	post.save().catch((error) => {
		throw error;
	});
};

const deletePostService = async function (id) {
	await Post.findByIdAndDelete(id);
};

const deletePostsByThreadId = async function (threadId) {
	await Post.deleteMany({ threadId: threadId });
};

const createPostService = async function (description, thread, creator) {
	const data = { description };

	if (!description || !thread || !creator) {
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
		thread: { id: thread.id, title: thread.title },
		creator: {
			name: creator.name,
			imageUrl: creator.imageUrl,
			id: creator.id,
		},
		createdOn: new Date(),
	});

	try {
		await newPost.save();
	} catch (error) {
		data.error = error;
		return data;
	}

	return data;
};

const getPostsByThreadId = async function (threadId, page) {
	const skipAmmount = page * 9;
	const posts = await Post.find({ 'thread.id': threadId })
		.sort({ createdOn: 1 })
		.skip(skipAmmount)
		.limit(10);
	let result = [];

	posts.forEach((post) => {
		const postObj = { ...post._doc };
		postObj.votes = getVotes(post);
		result.push(postObj);
	});

	result = result.sort((a, b) => b.votes - a.votes);
	return result;
};

const getPostsByCreatorId = async function (creatorId) {
	const posts = await Post.find({ 'creator.id': creatorId })
		.sort({
			createdOn: -1,
		})
		.limit(25);

	return posts;
};

const getVotes = function (post) {
	const votes =
		post.votes.filter((x) => x.type === 'upvote').length -
		post.votes.filter((x) => x.type === 'downvote').length;

	return votes;
};

const updateCreatorImage = async function (id, url) {
	await Post.updateMany(
		{ 'creator.id': id },
		{ $set: { 'creator.imageUrl': url } }
	);
};

module.exports = {
	createPostService,
	getPostsByThreadId,
	getPostById,
	getVotes,
	updateDescription,
	deletePostService,
	deletePostsByThreadId,
	getPostsByCreatorId,
	updateCreatorImage,
};

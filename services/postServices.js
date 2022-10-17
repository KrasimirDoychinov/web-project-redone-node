const sanitizeHtml = require('sanitize-html');

const Post = require('../models/Post');
const { postConstraints } = require('../utils/constraints');
const { requiredFieldsMsg } = require('../utils/consts');
const { buildConstraintError } = require('./errorEngine');

const create = async function (description, thread, creator) {
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
			forumSignature: creator.forumSignature,
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

const getById = async function (id) {
	const post = await Post.findById(id);
	post.description = sanitizeHtml(post.description, {
		allowedTags: ['b', 'i', 'em', 'strong', 'a', 'iframe', 'img'],
		allowedAttributes: {
			a: ['href', 'name', 'target'],
			iframe: ['title', 'src'],
			img: ['src'],
		},
	});
	return post;
};

const deleteById = async function (id) {
	await Post.findByIdAndDelete(id);
};

const deleteByThreadId = async function (threadId) {
	await Post.deleteMany({ threadId: threadId });
};

const allByThreadId = async function (threadId, page) {
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

const allByCreatorId = async function (creatorId) {
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

const updateDescription = async function (id, description) {
	const post = await getById(id);
	post.description = description;

	post.save().catch((error) => {
		console.log(error.message);
		throw error;
	});
};

const updateCreatorImage = async function (id, url) {
	await Post.updateMany(
		{ 'creator.id': id },
		{ $set: { 'creator.imageUrl': url } }
	);
};

const updateCreatorSignature = async function (id, forumSignature) {
	await Post.updateMany(
		{ 'creator.id': id },
		{ $set: { 'creator.forumSignature': forumSignature } }
	);
};

const getPopularPostsByThreadId = async function (threadId) {
	const data = await Post.find(
		{ 'thread.id': threadId },
		{ 'creator.name': 1, 'creator.imageUrl': 1, description: 1, createdOn: 1 }
	)
		.sort({ votes: -1 })
		.limit(3);

	const result = data.map((x) => {
		return {
			creator: {
				name: x.creator.name,
				imageUrl: x.creator.imageUrl,
			},
			description:
				x.description.length > 50
					? x.description.slice(0, 50) + '...'
					: x.description,
			createdOn: x.createdOn,
		};
	});

	return result;
};

const getTopPostersByThreadId = async function (threadId) {
	const users = await Post.aggregate([
		{
			$unwind: '$creator',
		},
		{ $group: { _id: '$creator.id' } },
	]);

	console.log(users);
	const result = [];
	for (const user of users) {
		const post = await Post.find(
			{
				$and: [
					{ $and: [{ 'creator.id': user._id }, { 'thread.id': threadId }] },
				],
			},
			{ 'creator.imageUrl': 1, 'creator.name': 1 }
		);

		result.push(post);
	}

	console.log(result);
	return result;
};

const postServices = {
	getById,
	create,
	deleteById,
	deleteByThreadId,
	allByThreadId,
	allByCreatorId,
	getVotes,
	updateDescription,
	updateCreatorImage,
	updateCreatorSignature,
	getPopularPostsByThreadId,
	getTopPostersByThreadId,
};

module.exports = postServices;

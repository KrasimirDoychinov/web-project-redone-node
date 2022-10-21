const Thread = require('./Thread');
const sanitizeHtml = require('sanitize-html');
const { requiredFieldsMsg, internalErrorMsg } = require('../../utils/consts');
const { threadConstraints } = require('../../utils/constraints');
const { buildConstraintError } = require('../errorEngine/errorEngine');
const { deletePostsByThreadId } = require('../post/postServices');

const create = async function (title, description, baseThreadId, creator) {
	const data = { error: false };
	if (!title || !description || !baseThreadId || !creator) {
		data.error = requiredFieldsMsg;
		return data;
	}

	if (
		title.length < threadConstraints.titleMinLength ||
		title.length > threadConstraints.titleMaxLength
	) {
		data.error = buildConstraintError(
			'Title',
			threadConstraints.titleMinLength,
			threadConstraints.titleMaxLength
		);
		return data;
	}

	if (
		description.length < threadConstraints.descriptionMinLength ||
		description.length > threadConstraints.descriptionMaxLength
	) {
		data.error = buildConstraintError(
			'Description',
			threadConstraints.descriptionMinLength,
			threadConstraints.descriptionMaxLength
		);
		return data;
	}

	const thread = new Thread({
		title,
		description,
		baseThreadId,
		creator: {
			name: creator.name,
			imageUrl: creator.imageUrl,
			id: creator.id,
		},
		createdOn: new Date(),
	});

	try {
		await thread.save();
	} catch (error) {
		data.error = internalErrorMsg;
	}

	return data;
};

const deleteById = async function (id) {
	await deletePostsByThreadId(id);
	await Thread.findByIdAndDelete(id);
};

const getById = async function (id) {
	const data = await Thread.findById(id);
	data.description = sanitizeHtml(data.description, {
		allowedTags: ['b', 'i', 'em', 'strong', 'a', 'iframe', 'img'],
		allowedAttributes: {
			a: ['href', 'name', 'target'],
			iframe: ['title', 'src'],
			img: ['src'],
		},
	});
	return data;
};

const allByViews = async function (limit) {
	const threads = await Thread.find({}).limit(limit);

	return threads;
};

const allByBase = async function (baseId, page = 0) {
	const skipAmmount = page * 9;
	const data = await Thread.find({ baseThreadId: baseId })
		.sort({
			createdOn: 1,
		})
		.skip(skipAmmount)
		.limit(10);

	return data;
};

const updateDescription = async function (id, description) {
	const thread = await getById(id);
	thread.description = description;

	thread.save().catch((error) => {
		throw error;
	});
};

const increaseViewCount = async function (id) {
	const thread = await getById(id);
	thread.views++;
	await thread.save();
};

const updateCreatorImage = async function (id, url) {
	await Thread.updateMany(
		{ 'creator.id': id },
		{ $set: { 'creator.imageUrl': url } }
	);
};

const updateCreatorSignature = async function (id, forumSignature) {
	await Thread.updateMany(
		{ 'creator.id': id },
		{ $set: { 'creator.forumSignature': forumSignature } }
	);
};

const threadServices = {
	create,
	deleteById,
	getById,
	allByViews,
	allByBase,
	increaseViewCount,
	updateDescription,
	updateCreatorImage,
	updateCreatorSignature,
};

module.exports = threadServices;

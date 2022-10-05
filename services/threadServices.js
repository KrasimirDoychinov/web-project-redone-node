const Thread = require('../models/Thread');
const sanitizeHtml = require('sanitize-html');
const { requiredFieldsMsg, internalErrorMsg } = require('../utils/consts');
const { threadConstraints } = require('../utils/constraints');
const { buildConstraintError } = require('./errorEngine');

const createThreadService = async function (
	title,
	description,
	baseThreadId,
	creator
) {
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
		creatorImageUrl: creator.imageUrl,
		creatorName: creator.name,
		createdOn: new Date(),
	});

	try {
		await thread.save();
	} catch (error) {
		data.error = internalErrorMsg;
	}

	return data;
};

const getAllThreadsByBaseThread = async function (baseId) {
	const data = await Thread.find({ baseThreadId: baseId });

	return data;
};

const getThreadById = async function (id) {
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

module.exports = {
	createThreadService,
	getAllThreadsByBaseThread,
	getThreadById,
};

const Thread = require('../models/Thread');
const sanitizeHtml = require('sanitize-html');
const { requiredFieldsMsg, internalErrorMsg } = require('../utils/consts');

const createThreadService = async function (
	title,
	description,
	baseThreadId,
	creatorId
) {
	const data = { error: false };
	if (!title || !description || !baseThreadId || !creatorId) {
		data.error = true;
		data.generalErrMsg = requiredFieldsMsg;
		return data;
	}

	const thread = new Thread({
		title,
		description,
		baseThreadId,
		creatorId,
	});

	try {
		await thread.save();
	} catch (error) {
		data.error = true;
		data.generalErrMsg = internalErrorMsg;
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

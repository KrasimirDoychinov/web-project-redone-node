const Thread = require('../models/Thread');
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

module.exports = {
	createThreadService,
};

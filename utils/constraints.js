const userConstrains = {
	nameMinLength: 6,
	nameMaxLength: 30,
	passMinLength: 8,
	passMaxLength: 100,
	forumSignatureMaxLength: 100,
};

const threadConstraints = {
	titleMinLength: 10,
	titleMaxLength: 50,
	descriptionMinLength: 10,
	descriptionMaxLength: 20000,
};

const postConstraints = {
	descriptionMinLength: 10,
	descriptionMaxLengt: 20000,
};

module.exports = {
	userConstrains,
	threadConstraints,
	postConstraints,
};

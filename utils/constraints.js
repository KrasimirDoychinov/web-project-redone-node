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
	descriptionMaxLength: 800,
};

const postConstraints = {
	descriptionMinLength: 10,
	descriptionMaxLength: 800,
};

module.exports = {
	userConstrains,
	threadConstraints,
	postConstraints,
};

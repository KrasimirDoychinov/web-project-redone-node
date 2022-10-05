const userConstrains = {
	nameMinLength: 6,
	nameMaxLength: 30,
	passMinLength: 8,
	passMaxLength: 100,
};

const threadConstraints = {
	titleMinLength: 10,
	titleMaxLength: 100,
	descriptionMinLength: 10,
	descriptionMaxLength: 20000,
};

module.exports = {
	userConstrains,
	threadConstraints,
};

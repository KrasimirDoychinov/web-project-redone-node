const userConstrains = {
	nameMinLength: 6,
	nameMaxLength: 30,
	passMinLength: 8,
	passMaxLength: 100,
};

const threadConstraints = {
	titleMaxLength: 100,
	descriptionMaxLength: 20000,
};

module.exports = {
	userConstrains,
	threadConstraints,
};

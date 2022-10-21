const buildConstraintError = function (title, constraintMin, constraintMax) {
	return `${title} length must be between ${constraintMin} and ${constraintMax}.`;
};

const errorEngine = {
	buildConstraintError,
};

module.exports = errorEngine;

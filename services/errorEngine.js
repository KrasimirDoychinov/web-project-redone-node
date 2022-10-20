const buildConstraintError = function (title, constraintMin, constraintMax) {
	return `${title} length must be bewteen ${constraintMin} and ${constraintMax}.`;
};

const errorEngine = {
	buildConstraintError,
};

module.exports = errorEngine;

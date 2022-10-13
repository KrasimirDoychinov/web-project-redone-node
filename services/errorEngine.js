const buildConstraintError = function (title, constraint1, constraint2) {
	return `${title} length must be bewteen ${constraint1} and ${constraint2}.`;
};

const errorEngine = {
	buildConstraintError,
};

module.exports = errorEngine;

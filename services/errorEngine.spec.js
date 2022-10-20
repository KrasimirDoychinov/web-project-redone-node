const { expect } = require("chai");
const errorEngine = require("./errorEngine");

describe('errorEngine', () => {

    describe('buildConstraintError', () => {

        it('should return correct string given arguments', () => {
            const buildError = errorEngine.buildConstraintError('Mock', '1', '2');

            expect(buildError).to.be.eq(`Mock length must be bewteen 1 and 2.`);
        });

    });
    
});
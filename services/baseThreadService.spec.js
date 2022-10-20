const { expect } = require('chai');
const sinon = require('sinon');
const stub = sinon.stub;

const BaseThread = require("../models/BaseThread");
const baseThreadService = require("./baseThreadServices");

describe('baseThreadServices', async () => {
    let dbMock, mockObj;
    beforeEach(() => {
        dbMock = [];
        mockObj = {title:'Title', description: 'Description', imageUrl: 'imageUrl', id: 1};
    });
    
    before(() => {
        const saveStub = stub(BaseThread.prototype, 'save').callsFake(() => {
           dbMock.push(mockObj);     
        });

        const findByIdStub = stub(BaseThread, 'findById').callsFake(() => {
            return dbMock.find(x => x.id === 1);
        });

        const findStub = stub(BaseThread, 'find').callsFake(() => {
            return dbMock;
        });
    });

    describe('create', () => {
        
        it('should increase count in dbMock', () => {
            baseThreadService.create('t', 't', 't')
            expect(dbMock.length).to.eq(1);
        });
            
    });

    describe('getById', () => {
        
        it('should return correct object by id', () => {
            baseThreadService.create(mockObj.title, mockObj.description, mockObj.imageUrl);

            return baseThreadService.getById(1).then(found => {
                expect(found).to.eql(mockObj);
            });
        });

    });

    describe('all', () => {
        	
        it('should return all added objects with correct length', () => {
            baseThreadService.create(mockObj.title, mockObj.description, mockObj.imageUrl);
            baseThreadService.create(mockObj.title, mockObj.description, mockObj.imageUrl);

            return baseThreadService.all().then(all => {
                expect(all).to.eql(dbMock);
            });
        })
        
    });

});
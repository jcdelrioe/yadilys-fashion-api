const sinon = require('sinon');

const { productsMock, filteredProductsMock } = require('./products');

const getAllStub = sinon.stub();

getAllStub.withArgs('products').resolves(productsMock);

const tagQuery = { name: { $in: ['Blackberry'] } };
getAllStub
  .withArgs('products', tagQuery)
  .resolves(filteredProductsMock('Blackberry'));

const createStub = sinon.stub().resolves(productsMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }
  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock,
};

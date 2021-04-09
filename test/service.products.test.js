const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { productsMock } = require('../utils/mocks/products');

describe('Services - products', function () {
  const ProductsServices = proxyquire('../services/products.js', {
    '../lib/mongo.js': MongoLibMock,
  });
  const ProducsService = new ProductsServices();
  describe('when getProducts method is called', async function () {
    it('should call the getAll MongoLib method', async function () {
      await ProducsService.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('Should return an array of products', async function () {
      const result = await ProducsService.getProducts({});
      const expected = productsMock;
      assert.deepStrictEqual(result, expected);
    });
  });
});

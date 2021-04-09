const assert = require('assert');
const proxyquire = require('proxyquire');

const { productsMock, ProductServiceMock } = require('../utils/mocks/products');

const testServer = require('../utils/testServer');

describe('routes - products', function () {
  const route = proxyquire('../routes/products.js', {
    '../services/products.js': ProductServiceMock,
  });
  const request = testServer(route);
  describe('GET /products', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/products').expect(200, done);
    });
    it('should respond with the list of products', function (done) {
      request.get('/api/products').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: productsMock,
          message: 'products listed',
        });
        done();
      });
    });
  });
});

const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', function () {
  describe('when receives an entity and an action', function () {
    it('should return the respective message', function () {
      const result = buildMessage('product', 'create');
      const expect = 'product created';
      assert.strictEqual(result, expect);
    });
  });
  describe('when receives an entity and an action and is a list', function () {
    it('should return the respective message with the entity in plural', function () {
      const result = buildMessage('product', 'list');
      const expect = 'products listed';
      assert.strictEqual(result, expect);
    });
  });
});

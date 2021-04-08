const { productsMock } = require('../utils/mocks/products.js');

class ProductsService {
  async getProducts() {
    const products = await Promise.resolve(productsMock);
    return products || [];
  }
  async getProduct() {
    const product = await Promise.resolve(productsMock[0]);
    return product || {};
  }
  async createProduct() {
    const createProductId = await Promise.resolve(productsMock[0].id);
    return createProductId;
  }
  async updateProduct() {
    const updateProductId = await Promise.resolve(productsMock[0].id);
    return updateProductId;
  }
  async deleteProduct() {
    const deleteProductId = await Promise.resolve(productsMock[0].id);
    return deleteProductId;
  }
}

module.exports = ProductsService;

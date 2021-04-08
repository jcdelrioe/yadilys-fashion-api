const express = require('express');
const ProductsService = require('../services/products');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get('/', async function (req, res, next) {
    try {
      const products = await productsService.getProducts(); // verificar con que reeplazar tags

      res.status(200).json({
        data: products,
        message: 'products listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:productId', async function (req, res, next) {
    const { productId } = req.params;
    try {
      const products = await productsService.getProduct({ productId });

      res.status(200).json({
        data: products,
        message: 'product retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const { body: product } = req;
    try {
      const createProductId = await productsService.createProduct({ product });

      res.status(201).json({
        data: createProductId,
        message: 'product created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:productId', async function (req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;

    try {
      const updatedProductId = await productsService.updateProduct({
        productId,
        product,
      });

      res.status(200).json({
        data: updatedProductId,
        message: 'product updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:productId', async function (req, res, next) {
    const { productId } = req.params;

    try {
      const deletedProductId = await productsService.deleteProduct({
        productId,
      });

      res.status(200).json({
        data: deletedProductId,
        message: 'product deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}
module.exports = productsApi;

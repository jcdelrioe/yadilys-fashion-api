const express = require('express');
const joi = require('joi');
const ProductsService = require('../services/products');
const {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
} = require('../utils/schemas/products');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get('/', async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { name } = req.query;
    try {
      const products = await productsService.getProducts({ name });

      res.status(200).json({
        data: products,
        message: 'products listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:productId',
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

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
    }
  );

  router.post(
    '/',
    validationHandler(createProductSchema),
    async function (req, res, next) {
      const { body: product } = req;
      try {
        const createProductId = await productsService.createProduct({
          product,
        });

        res.status(201).json({
          data: createProductId,
          message: 'product created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:productId',
    validationHandler(joi.object({ productId: productIdSchema }), 'params'),
    validationHandler(updateProductSchema),
    async function (req, res, next) {
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
    }
  );

  router.delete(
    '/:productId',
    validationHandler(joi.object({ productId: productIdSchema })),
    async function (req, res, next) {
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
    }
  );
}
module.exports = productsApi;

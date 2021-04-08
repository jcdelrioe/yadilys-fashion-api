const joi = require('joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productNameSchema = joi.string().max(80);
const productSizeSchema = joi.string().max(10);
const productDescriptionSchema = joi.string().max(200);
const productImageSchema = joi.string().uri();
const productPriceSchema = joi.number();

const createProductSchema = joi.object({
  name: productNameSchema.required(),
  size: productSizeSchema.required(),
  description: productDescriptionSchema.required(),
  image: productImageSchema,
  price: productPriceSchema.required(),
});

const updateProductSchema = joi.object({
  name: productNameSchema,
  size: productSizeSchema,
  description: productDescriptionSchema,
  image: productImageSchema,
  price: productPriceSchema,
});

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
};

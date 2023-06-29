const express = require('express');

const OrderProductService = require('../services/order-product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderProductSchema,
  createOrderProductSchema,
} = require('../schemas/order-product.schema');

const router = express.Router();
const service = new OrderProductService();

router.get(
  '/:id',
  validatorHandler(getOrderProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
async(req,res,next)=>{
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
})

router.post('/',validatorHandler(createOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

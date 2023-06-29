const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderProductService {

  constructor(){
  }

  async create(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const items = await models.OrderProduct.findAll();
    return items;
  }

  async findOne(id) {
    const item = await models.OrderProduct.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    if (!item) {
      throw boom.notFound('Order not found');
    } else {
      return item;
    }


  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderProductService;

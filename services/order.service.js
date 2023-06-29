const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        "items"
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    } else {
      return order;
    }
  }

  async findByUser(userId) {
    //Se hace la consulta a pesar que se tiene el id de user y no de customer
  const orders =await models.Order.findAll({
      //Cuando hay tipos de estas asociaciones, se usa: where
  where: {
        '$customer.user.id$': userId
      },
      include: [
        {
        //Customer tiene una relación con user (relación de tablas)
        association: 'customer',
        //Con user se puede filtrar esas ordenes de compra asociadas a ese usuario y a customer
        include: ['user']
        }
      ]
    });
  return orders;
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

module.exports = OrderService;

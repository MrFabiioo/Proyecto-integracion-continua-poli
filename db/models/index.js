const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./order.model');
const {OrderProduct,OrderProductSchema} = require('./order-product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema,Product.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Customer.init(CustomerSchema,Customer.config(sequelize));
  Order.init(OrderSchema,Order.config(sequelize));
  OrderProduct.init(OrderProductSchema,OrderProduct.config(sequelize));

  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;

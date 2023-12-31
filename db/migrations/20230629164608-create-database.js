'use strict';
const {OrderSchema,ORDER_TABLE} = require('../models/order.model');
const {UserSchema,USER_TABLE} = require('../models/user.model');
const {ProductSchema,PRODUCT_TABLE} = require('../models/product.model');
const {CategorySchema,CATEGORY_TABLE} = require('../models/category.model');
const {CustomerSchema,CUSTOMER_TABLE} = require('../models/customer.model');
const {OrderProductSchema,ORDER_PRODUCT_TABLE} = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE,OrderSchema);
    await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE,UserSchema);
    await queryInterface.dropTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.dropTable(CUSTOMER_TABLE,CustomerSchema);
    await queryInterface.dropTable(ORDER_TABLE,OrderSchema)
    await queryInterface.dropTable(PRODUCT_TABLE,ProductSchema)
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE,OrderProductSchema);
  }
};

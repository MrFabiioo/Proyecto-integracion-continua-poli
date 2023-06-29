const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_TABLE = 'products'; // nombre de la tabla
const {CATEGORY_TABLE} = require('./category.model');

const ProductSchema = {
  // El esquema define la estructura de la BD.
  id: {
    allowNull: false, // campo no puede ser nulo
    autoIncrement: true, //  este campo es auto incremental
    primaryKey: true, //  este campo es la llave primaria
    type: DataTypes.INTEGER, //  tipo de dato
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};
// la clase con el modelo, modelo con las formas con las que se van a hacer querys
class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  //configuracion
  static config(sequelize) {
    return {
      sequelize, // coneccion con la base de datos
      tableName: PRODUCT_TABLE, // nombre de la tabla
      modelName: 'Product', // nombre del modelo
      timestamps: false, // creacion de campos por defecto
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };

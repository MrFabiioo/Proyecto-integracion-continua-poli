const { Model, DataTypes, Sequelize } = require('sequelize');
const USER_TABLE = 'users'; // nombre de la tabla

const UserSchema = {
  // El esquema define la estructura de la BD.
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue:'customer',
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};
// la clase con el modelo, modelo con las formas con las que se van a hacer querys
class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer,{ // relaciones
      as:'customer',
      foreignKey: 'userId'
    });
  }

  //configuracion
  static config(sequelize) {
    return {
      sequelize, // coneccion con la base de datos
      tableName: USER_TABLE, // nombre de la tabla
      modelName: 'User', // nombre del modelo
      timestamps: false, // creacion de campos por defecto
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };

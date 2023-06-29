const boom = require('@hapi/boom');
//const pool = require('../libs/postcres.pool');
const {models} = require('../libs/sequelize');
const bcrypt = require('bcrypt');


class UserService {
  constructor() {

  }

  async create(data) {
    const hash = await bcrypt.hash(data.password,10);
    const response = await models.User.create({
      ...data,
      password:hash
    });
    delete response.dataValues.password;
    return response;
  }

  async find() {
    const response =  await models.User.findAll({
      include:["customer"]
    });
    return response;
  }
//Encontrar el primer usuario que tenga el email qué además es único
async findByEmail(email) {
  const response = await models.User.findOne({
  where: { email }
    });
  return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('Usuario no encontrador');
    } else {
      return user;
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return  response;
  }

  async delete(id) {
    const user = this.findOne(id);
    (await user).destroy();
    return { id };
  }
}

module.exports = UserService;

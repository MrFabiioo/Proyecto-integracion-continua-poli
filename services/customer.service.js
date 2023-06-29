const boom=require('@hapi/boom');
const{models}=require('../libs/sequelize');
const bcrypt = require('bcrypt');
class CustomerService{
  constructor(){

  }
async find(){
  const response=await models.Customer.findAll({
    include:['user'] // incluyendo la asociacion de sequalize
  });
  return response;
}
async findOne(id){
  const customer=await models.Customer.findByPk(id);
  if(!customer){
    throw boom.notFound('customer not found');
  }
return customer;
}
async create(data){
  const hash = await bcrypt.hash(data.user.password,10);
  const newData = {
    ... data,
    user:{
      ...data.user,
      password:hash
    }
  }

  const newCustomer=await models.Customer.create(newData,{
    include:['user']});// creacion del objeto con la asociacion/relacion del modelo con sequalize
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }
async update(id,changes){
  const model=await this.findOne(id);
  const response=await model.update(changes);
  return response;
}
async delete(id){
  const model=await this.findOne(id);
  await model.destroy();
  return{rta:true};
}

}
module.exports= CustomerService;

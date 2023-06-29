//Importar boom para los errores:
const boom = require('@hapi/boom');
//Importar bcrypt para encriptarla contraseña:
const bcrypt = require('bcrypt');
//Importar jwt para la firma:
const jwt = require('jsonwebtoken');
//Importar nodemailer para el envío del email:
const nodemailer = require('nodemailer');
//Importar config para obtener el secret
const { config } = require('./../config/config');
//Importar el servicio de los usuarios
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  //Obtener un usuario en base de un email y un password:
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      //Lanzamos el error cuando no está autorizado el 				usuario:
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    //Se retorna el usaurio sin imprimir el password
    return user;
  }
  //Recibe el usuario que está autenticado:
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }
  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.nodeMailesGmail,
        pass: config.nodeApp,
      },
    });
    await transporter.sendMail(infoMail);
    //Retorna un mensaje:
    return { message: 'mail sent' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = await jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;

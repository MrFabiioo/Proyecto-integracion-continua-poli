const express = require('express');
const passport = require('passport');
//Importar a auth.service:
const AuthService = require('./../services/auth.service');

const router = express.Router();
//Crear la instancia de nuestro servicio
const service = new AuthService();

//Para recuperar
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      //Llamar a signToken (como es sincrono se puede resolver sin ningún await):
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

//No tiene autenticación, solo pide el email del body para comprobarlo
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    //Llamar a sendMail (es asincrono):
    const rta = await service.sendRecovery(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

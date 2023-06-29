//-------------------------------- CON RESPECTO A LA CLASE DE BCRYPT  -----------------//
// //Nos treamos a passport-local
// const { Strategy } = require('passport-local');
// //Usamos a boom como manejador de errores
// const boom = require('@hapi/boom');
// const bcrypt = require('bcrypt');

// const UserService = require('./../../../services/user.service');
// //Se crea una instancia de servicio
// const service =new UserService();

// //Constructor
// const LocalStrategy =new Strategy({
// 	//La estrategia local es la más básica
// 	usernameField: 'email',
// 	passwordField: 'password'
// 	},
// async (email, password, done) => {
// try {
// 			//Buscar con findByEmail el usuario
// const user =await service.findByEmail(email);
// 			//Validaión para cuando el usuario no exista
// if (!user) {
// 				//Así se envían los errores con false
// 				done(boom.unauthorized(),false);
// 			}
// 			//Comprobación del password con el hash
// const isMatch =await bcrypt.compare(password, user.password);
// 			//Si el password no coincide, sale un mensaje que el usuario no está autorizado
// if (!isMatch) {
// 				done(boom.unauthorized(),false);
// 			}
// delete user.dataValues.password;
// 			//Si todo salió bien, se ejecuta el done enviando null diciendo que nno hay error
// 			done(null, user);
// 		}catch (error) {
// 			done(error,false);
// 		}
// 	}
// );
// module.exports = LocalStrategy;

//----------------------- con respecto a la Clase  16 ------------------------***

//Nos treamos a passport-local
const { Strategy } = require('passport-local');

const AuthService = require('./../../../services/auth.service');
const service =new AuthService();

const LocalStrategy =new Strategy({
	usernameField: 'email',
	passwordField: 'password'
},
async (email, password, done) => {
try {//sevice viene de authservice.js donde queda toda la lógica que teniamos antes
const user =await service.getUser(email, password);
		done(null, user);
	}catch (error) {
		done(error,false);
	}
}
);

module.exports = LocalStrategy;

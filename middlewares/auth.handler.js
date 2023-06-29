const boom = require('@hapi/boom');
const {config} = require('../config/config');

function checkApiKey(req,res,next){
  const apiKey = req.headers['api'];
  if (apiKey===config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}
//Ésta función solo evalúa para el role ‘admin’
function checkAdminRole(req,res,next){
	console.log(req.user);
	//Se encuentra el payload
const user=req.user;
if(user.role==='admin'){
		next();
	}else{
		next(boom.forbidden('se requieren permisos de administrador'));
	}
}

//Los 3 puntos transorma todo argumento en array
function checkRoles(...roles){
    return(req,res,next)=>{
        const user=req.user;
            //Compara el role del usuario con los roles permitidos enviados
            if(roles.includes(user.role)){
                  next();
                }else{
                  next(boom.forbidden('se requieren permisos de administrador'));
                }
      }
}

module.exports = {checkApiKey,checkRoles,checkAdminRole}

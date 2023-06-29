const express=require('express');
const passport=require('passport');
const OrderService=require('../services/order.service');

const router=express.Router();
const service=new OrderService();

router.get('/my-orders',
	passport.authenticate('jwt',{session:false}),
async(req,res,next)=>{
try{
			//Necesitamos el user para obtener el identificador sub
const user=req.user;
			//Las ordenes de compra
const orders=await service.findByUser(user.sub);
			res.json(orders);
		}catch(error){
			next(error);
		}
	}
);

module.exports=router;

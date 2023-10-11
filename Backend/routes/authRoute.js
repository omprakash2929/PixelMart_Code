import express  from "express";
import {registerController , loginController, forgotpasswordController, updateProfileController, getOrdersController, getAllOrdersController, OrdersStatusController, allUserConteroller} from '../controller/authController.js'
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";

// route object 

const router = express.Router();

//*routing

//?Register || Method post

router.post('/register', registerController);

//!Login || method Post

router.post('/login', loginController);

//! Forgot Password
router.post('/forgot-password', forgotpasswordController)

//! All User
router.get('/all-User',requireSignin,isAdmin,allUserConteroller)

//protect Route
router.get("/user-auth", requireSignin, (req, res)=>{
    res.status(200).send({ok:true});
})
//!protect Admin  Route
router.get("/admin-auth", requireSignin,isAdmin, (req, res)=>{
    res.status(200).send({ok:true});
})

//! Update profile 
router.put('/profile', requireSignin, updateProfileController)

//? Order Rotes
router.get('/orders', requireSignin, getOrdersController )

//* Admin all Orders
router.get('/all-orders', requireSignin,isAdmin, getAllOrdersController )
//* Admin Orders status Update

router.put('/orders-status/:orderId', requireSignin,isAdmin, OrdersStatusController )
export default router
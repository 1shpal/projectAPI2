const express = require('express');
const router = express.Router();
const userController  = require('../controller/userController');
const cartController = require('../controller/cartController');
const orderController = require('../controller/orderController');
const tokenVarification= require("../midelware/tokenVarification"); 

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get("/view-user",userController.viewUser);
router.post("/add-to-fav-package",tokenVarification.varifyToken,userController.addToFavPackage);
router.post("/add-to-fav-item",tokenVarification.varifyToken,userController.addToFavItem);
router.get("/verifyByEmail/:userId",userController.verified);
router.post("/fav-foods-view",tokenVarification.varifyToken,userController.viewFavFoods);

router.post("/add-package-to-cart",tokenVarification.varifyToken,cartController.addPackage);
router.post("/add-item-to-cart",tokenVarification.varifyToken,cartController.addItem);
router.get("/view-cart",tokenVarification.varifyToken,cartController.viewCart);
router.post("/remove-package-from-cart",tokenVarification.varifyToken,cartController.removePackage);
router.post("/remove-item-from-cart",tokenVarification.varifyToken,cartController.removeItem);
router.delete("/delete-cart",tokenVarification.varifyToken,cartController.deleteCart);

router.post("/place-order",tokenVarification.varifyToken,orderController.placeOrder);
router.get("/view-order/:uid",tokenVarification.varifyToken,orderController.viewOrder);
router.get('/order-history',tokenVarification.varifyToken,orderController.orderHistory);
router.post('/send-receipt',tokenVarification.varifyToken,orderController.sendReceipt);


module.exports = router;
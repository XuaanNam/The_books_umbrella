const express = require("express");
const api = require("../app/controllers/API");
const router = express.Router();
const passport = require("passport");
const PassportCheck = passport.authenticate('jwt', { session: false });

// guest 
router.post('/register', api.register);
router.post('/login', api.login);
router.post('/check/email', api.emailCheck);
router.post('/check/username', api.usernameCheck);

router.get('/isauth', PassportCheck, api.isAuth);

// product
router.get('/products', api.getProducts);
router.get('/products/detail/:id', api.getProductById);
router.get('/products/search/keywords', api.getProductsByKeywords);
router.get('/products/search/genre', api.getProductsByGenre);
router.get('/products/search/price', api.getProductsByPrice);
router.get('/products/search/publisher', api.getProductsByPublisher);
router.get('/products/search/age', api.getProductsByAge);
router.get('/products/search/form', api.getProductsByForm);

// cart
router.get('/cart', PassportCheck, api.getCart);
router.post('/cart/add', PassportCheck, api.addToCart);
router.delete('/cart/remove', PassportCheck, api.removeFromCart);
router.patch('/cart/update', PassportCheck, api.updateCart);
router.post('/cart/order', PassportCheck, api.createOrder);

// profile
router.get('/profile', PassportCheck, api.getProfile);
router.patch('/profile/update', PassportCheck, api.updateProfile);

// payment
router.post('/payment/paypal', PassportCheck, api.paymentByPaypal);
router.get('/paymentsuccess', api.paymentSuccess);

//admin
router.get('/admin/warehouse', PassportCheck, api.getWarehouse);
router.post('/admin/product/create', PassportCheck, api.createProduct);
router.patch('/admin/product/update', PassportCheck, api.updateProduct);
router.patch('/admin/product/disable', PassportCheck, api.disableProduct);
router.patch('/admin/product/enable', PassportCheck, api.enableProduct);
// router.post('/admin/order', PassportCheck, api.createOrder);








module.exports = router;

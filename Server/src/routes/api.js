const express = require("express");
const api = require("../app/controllers/API");
const router = express.Router();
const passport = require("passport");
const PassportCheck = passport.authenticate('jwt', { session: false });

router.post('/register', api.register);
router.post('/login', api.login);
router.post('/check/email', api.emailCheck);
router.post('/check/username', api.usernameCheck);

router.get('/isauth', PassportCheck, api.isAuth);

router.get('/products', api.getProducts);
router.get('/products/detail/:id', api.getProductById);
router.get('/products/search/keywords', api.getProductsByKeywords);
router.get('/products/search/genre', api.getProductsByGenre);
router.get('/products/search/price', api.getProductsByPrice);
router.get('/products/search/publisher', api.getProductsByPublisher);
router.get('/products/search/age', api.getProductsByAge);
router.get('/products/search/form', api.getProductsByForm);

router.get('/cart', PassportCheck, api.getCart);
router.post('/cart/add', PassportCheck, api.addToCart);
router.post('/cart/remove', PassportCheck, api.removeFromCart);
router.post('/cart/update', PassportCheck, api.updateCart);






module.exports = router;

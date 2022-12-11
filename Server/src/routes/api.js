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
router.get('/cart', PassportCheck, api.getCart);
router.post('/cart/added', PassportCheck, api.addToCart);



module.exports = router;

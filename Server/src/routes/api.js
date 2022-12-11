const express = require('express');
const api = require('../app/controllers/API');
const router = express.Router();
const passport = require('passport');


router.post('/register', api.register);
router.post('/login', api.login);
router.post('/check/email', api.emailCheck);
router.post('/check/username', api.usernameCheck);

router.get('/isauth', passport.authenticate('jwt', { session: false }), api.isAuth);
router.get('/products', api.getProducts);
//router.get('/cart/added', api.getProducts);



module.exports = router;
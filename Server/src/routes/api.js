const express = require('express');
const api = require('../app/controllers/API');
const router = express.Router();
const passport = require('passport');
const upload = require('../app/middleware/upload')


// router.post('/register', api.register);
// router.post('/login', api.login);
// router.get('/logout', api.logout);
router.get('/products', api.getProducts);


module.exports = router;
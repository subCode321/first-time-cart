var express = require('express');
var router = express.Router();
// const passport = require('passport');
// const flash = require('connect-flash')
const Product = require('../models/product');
// const csrf = require('csurf');
// const csrfProtection = csrf();
// router.use(csrfProtection);
const { body, validationResult } = require('express-validator');



router.get('/', function (request, response, next) {
  Product.find()
    .then((products) => {
      // Existing logic remains the same
      let productChunks = [];
      for (let i = 0; i < products.length; i += 3) {
        productChunks.push(products.slice(i, i + 3));
      }

      response.render('shop/index', { 
        title: 'Soubhagya', 
        products: productChunks 
      });
    })
    .catch((err) => {
      console.error('Error finding products:', err);
      response.render('shop/index', { 
        title: 'Soubhagya', 
        products: [],
        error: err.message
      });
    });
});




module.exports = router;
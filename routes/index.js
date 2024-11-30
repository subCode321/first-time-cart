var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('shop/index', { title: 'Soubhagya' });
});

router.get('/cart/checkout/:id', function(request, response, next) {
  response.render('shop/index', { title: request.params.id });
});

module.exports = router;

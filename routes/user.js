var express = require('express');
var router = express.Router();
const passport = require('passport');
// const flash = require('connect-flash')
// const Product = require('../models/product');
// const csrf = require('csurf');
// const csrfProtection = csrf();
// router.use(csrfProtection);
const { body, validationResult } = require('express-validator');

router.get('/profile',isLoggedIn,function(req,res,next){
    res.render('user/profile');
  
  })
  


router.use('/',notLoggedIn,function(req,res,next){
    next();
})

router.get('/signup', function(request, response, next){
    const messages = request.flash('error');
    response.render('user/signup', { 
      csrfToken: request.csrfToken(), messages:messages, hasErrors : messages.length>0 
    });
  });
  
  router.post('/signup', passport.authenticate('local.signup' , {
    successRedirect: '/user/profile',
    failureRedirect : '/user/signup',
    failureFlash : true
  }
  )
  
    // Add CSRF protection middleware
    
   
  );
  router.get('/signin', function(request, response, next){
    const messages = request.flash('error');
    response.render('user/signin', { 
      csrfToken: request.csrfToken(), messages:messages, hasErrors : messages.length>0 
    });
  });
  router.post('/signin', passport.authenticate('local.signin' , {
    successRedirect: '/user/profile',
    failureRedirect : '/user/signin',
    failureFlash : true
  }
  )
  
    // Add CSRF protection middleware
    
   
  );
  
  router.get('/logout', function(res,req,next){
    req.logout();
    res.redirect('/');
  })
  

  
  module.exports = router;

  function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
  }
  function notLoggedIn(req,res,next){
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
  }
var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var passport = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn,function (req,res,next) {
    Order.find({user: req.user}, function (err, orders) {
        if(err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {orders: orders});
    });
});

router.get('/logout', isLoggedIn, function (req,res, next) {
    req.logout();
    res.redirect('/');
});



router.use('/',notLoggedIn,function (req, res, next) {
    next();
});


router.get('/sign-up',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/sign-up',{ csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length>0});
});

//noinspection JSUnresolvedFunction
router.post('/sign-up',passport.authenticate('local.sign-up',{
    failureRedirect: '/user/sign-up',
    failureFlash: true
}),function (req, res, next) {
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile');
    }
});



router.get('/sign-in',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/sign-in',{ csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length>0});
});

router.post('/sign-in',passport.authenticate('local.sign-in',{
    failureRedirect: '/user/sign-in',
    failureFlash: true

}),function (req, res, next) {
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile');
    }
});



module.exports = router;

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req,res,next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

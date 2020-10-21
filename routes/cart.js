const router = require('express').Router();
const User = require('../model/User');
const { verifyAuth }   = require('./verifyAuth');

class Cart {
    constructor() {
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.items = [];
      this.cartId = null
    }
  }
  
router.use((req, res, next) => {
    if (req.session.userId && typeof req.session.cart === "undefined") {
        req.session.cart = new Cart();
        next();
    } 
    res.status(401).send('Acces Denied')
})

router.get('/test', (req, res) => {
    res.send('GET REQUEST 1 ')
})

router.get('/testt', (req, res) => {
    res.send('GET REQUEST 2')
})

module.exports = router;
const router = require('express').Router();
const Item = require('../model/Items');
const { verifyAuth }   = require('./verifyAuth');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class Cart {
    constructor() {
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.items = [];
      this.userId = null
    }
  }
  
router.use((req, res, next) => {
    if (req.session.userId && typeof req.session.cart === "undefined") {
        req.session.cart = new Cart();
        next();
    }  
    else {
        next();
    }
})

// CART ROUTES AND MIDDLEWARE
router.get('/', verifyAuth, (req, res) => {
    res.json(req.session.cart)   
})

router.post('/:_id', verifyAuth, async (req, res) => {
    // We first check if the id is a mongoose.Types.ObjectId
    if(!ObjectId.isValid(req.params._id)) return res.status(404).send("item's id isn't valid")
    
    // We then check if the quantity is a number
    if(isNaN(parseInt(req.body.quantity)) || parseInt(req.body.quantity) <= 0) return res.status(404).send('Quantity must be a number')

    // We need to check if the item in req.params is in the database
    const item = await Item.findById(req.params._id);      
    if(!item) return res.status(404).send('Item not found in db')

    // Then we need to check if the article is already in the cart 
    const cart = req.session.cart.items.find(element => element._id === req.params._id)
    if(cart) return res.status(400).send('Item is already in cart, delete it, or change quantity in the cart')

    // Now we can update our  cart 
    req.session.cart.items.push({ 
        _id: req.params._id, 
        quantity: parseInt(req.body.quantity)
    })
    req.session.cart.updatedAt = new Date()
    req.session.cart.userId = req.session.userId
    res.send(req.session.cart)
})

router.put('/:_id', verifyAuth, async (req, res) => {
    // We first check if the id is a mongoose.types.ObjectId in order to handle errors
    if(!ObjectId.isValid(req.params._id)) return res.status(404).send("item's id isn't valid")

    // We then check if the quantity is a number
    if(isNaN(parseInt(req.body.quantity)) || parseInt(req.body.quantity) <= 0) return res.status(404).send('Quantity must be a number')

    // We need to check if the item in req.params is in the database
    const item = await Item.findById(req.params._id);      
    if(!item) return res.status(404).send('Item not found in db')

    // We then check if the item is in the cart.
    const itemInCart = req.session.cart.items.find((element) => element._id === req.params._id)
    if(!itemInCart) return res.status(404).send('Item not found in cart')

    // We finally can change the quantity 
    itemInCart.quantity = parseInt(req.body.quantity)
    res.json(req.session.cart)
})

router.delete('/:_id', verifyAuth, async (req, res) => {
    // We first check if the id is a mongoose.Types.ObjectId
    if(!ObjectId.isValid(req.params._id)) return res.status(404).send("item's id isn't valid")

    // We need to check if the item in req.params is in the database
    const item = await Item.findById(req.params._id);      
    if(!item) return res.status(404).send('Item not found in db')

    // We then check if the item is in the cart.
    const itemInCart = req.session.cart.items.findIndex((element) => element._id === req.params._id)
    if(itemInCart === -1) return res.status(404).send('Item not found in cart')

    // Otherwise we delete it
    req.session.cart.items.splice(itemInCart, 1)
    req.session.cart.updatedAt = new Date()
    res.json(req.session.cart)
})

module.exports = router;
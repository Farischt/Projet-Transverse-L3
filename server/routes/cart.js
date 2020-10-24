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
      this.cartId = null
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


// this route return all the items in items table (not the cart)

router.get('/items', verifyAuth, async (req, res) => {
    try {
        // We request the db to get all the items
        const items = await Item.find({})
        if(items.length === 0) return res.status(404).send('No available data, please add some items first')
        res.send(items)
    } catch(err) {
        res.status(400).send(error)
    }
})

// This route add an item to items Table Only

router.post('/additem', verifyAuth, async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.descritpion,
        price: parseInt(req.body.price),
    })
    try {
        const savedItem = await item.save();
        console.log(savedItem);
        res.send({ item: savedItem._id});
    } catch(error) {
        res.status(400).send(error);
    }
})

router.delete('/deleteItem')



// CART ROUTES AND MIDDLEWARE

router.get('/cart', verifyAuth, (req, res) => {
    res.send(req.session.cart)   
})

router.post('/add', verifyAuth, async (req, res) => {
    // We first check if the id is a mongoose.Types.ObjectId
    if(!ObjectId.isValid(req.body._id)) return res.status(404).send("Id isn't valid")
    
    // We then check if the quantity is a number
    if(isNaN(parseInt(req.body.quantity))) return res.status(404).send('Quantity must be a number')

    // We need to check if the item in req.body is in the database
    const item = await Item.findById(req.body._id);      
    if(!item) return res.status(404).send('Item not found in db')

    // Then we need to check if the article is already in the cart 
    // ! TO MODIFY WHEN CART WILL BE IN DB 
    const cart = req.session.cart.items.find(i => i._id === req.body._id)
    if(cart) return res.status(400).send('Item is already in cart, delete it, or change quantity in the cart')

    // Now we can add our item in cart 
    req.session.cart.items.push({ 
        _id: req.body._id, 
        quantity: parseInt(req.body.quantity)
    })
    res.send(req.session.cart.items)
})

module.exports = router;
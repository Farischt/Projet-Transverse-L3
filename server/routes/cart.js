const router = require('express').Router();
const User = require('../model/User');
const Item = require('../model/Items');
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
    else {
        next();
    }
})

router.get('/cart', verifyAuth, (req, res) => {
    res.send(req.session.cart)   // a faire avec la db
})

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

/*router.post('/cart', async (req, res) => {
    // We check if the item exist in dataBase
    const item = await findOne({ _id: parseInt(req.body.id)});
    if(!item) return res.status(404).send(`Article number ${req.body.id} doesn't.`);

    // We add the item in cart
    req.session.cart.push({ id: parseInt(req.body.id), quantity: parseInt(req.body.quantity) });
    return res.send(req.session.carte)
})*/

module.exports = router;
const router = require('express').Router();
const Item = require('../model/Items');
const { verifyAuth }   = require('./verifyAuth');


// this route return all the items in items table (not the cart)

router.get('/', verifyAuth, async (req, res) => {
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

router.post('/', verifyAuth, async (req, res) => {
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

module.exports = router;
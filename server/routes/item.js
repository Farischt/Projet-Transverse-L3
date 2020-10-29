const router = require('express').Router();
const Item = require('../model/Items');
const { verifyAuth }   = require('../helpers/verifyAuth');


// this route return all the items in items table (not the cart)

router.get('/', async (req, res) => {
    try {
        // We request the db to get all the items
        const items = await Item.find({})
        if(items.length === 0) return res.status(404).json({ errorMessage: 'No available data, please add some items first' })
        res.json(items)
    } catch(err) {
        res.status(400).json({ errorMessage: error })
    }
})

// This route add an item to items Table Only : Admin part 

router.post('/', verifyAuth, async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.descritpion,
        price: parseInt(req.body.price),
    })
    try {
        const savedItem = await item.save();
        res.json({ item: savedItem._id });
    } catch(error) {
        res.status(400).json({ errorMessage: error });
    }
})

// This route return specific items based on the query. Search function 
router.get('/:query', async (req, res) => {
    // We first check that the query is a string
    if(typeof(req.params.query) != 'string') return res.status(400).json({ errorMessage: "Bad request" })

    // Then we ask the db for a list of items matching the query 
    const items = await Item.find({ name: req.params.query })
    if(items.length === 0) return res.status(404).json({ errorMessage: "Not found, no item matching with your query" })

    res.json(items)
})

module.exports = router;
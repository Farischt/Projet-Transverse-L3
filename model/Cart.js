const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    updatedAt: {
        type: Date, 
        default: Date.now()
    },
    items: {
        type: Number,
    }
})
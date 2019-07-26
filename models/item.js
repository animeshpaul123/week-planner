const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    editable: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    }    
})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
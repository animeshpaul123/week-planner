const express = require('express');
const router = express.Router();

const Item = require('../../models/item');

// @route GET api/posts
router.get('/', (req,res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
        .catch(err => res.send('can not get items', err))
})

router.post('/', (req,res) => {
    Item.create(req.body)
        .then(newItem => res.status(201).json(newItem))
        .catch(err => res.send('can not create new item', err))
})

router.get('/:id', (req,res) => {
    Item.findById(req.params.id)
        .then(foundItem => res.json(foundItem))
        .catch(err => res.send('can not find item', err))
})

router.put('/:id', (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(item => res.json(item))
        .catch(err => res.send('can not update item', err))
})

router.delete('/:id', (req,res) => {
    Item.remove({_id: req.params.id})
        .then(() => res.json({
            message: 'we deleted it',
            success: true,    
        }))
        .catch(err => res.status(404).json({success: false}))
})
module.exports = router;
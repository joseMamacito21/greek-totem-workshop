const _ = require('lodash');
const mongoose = require('mongoose');
const Item = mongoose.model('items');
const { ObjectId } = mongoose.Types;
const validateItem = require('../validation/itemValidation');

module.exports = app => {
  // @route GET /api/items
  // @access Public
  // @description List all items
  app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
  }); 

  // @route GET /api/items/:item_id
  // @access Public
  // @description Get an item by its id
  app.get('/api/items/:item_id', async (req, res) => {
    const { item_id } = req.params;
    const item = await Item.findById(item_id);
    res.send(item)
  });

  // @route POST /api/items
  // @access Public
  // @description Creates an item
  app.post('/api/items', async (req, res) => { 
    const errors =  validateItem(req.body);
    console.log(_.isEmpty(errors));
    if(!_.isEmpty(errors)) {
      return res.status(400).json(errors);
    } 

    const { name, unitsOfMeasure } = req.body;
    
    const item = new Item({ name, unitsOfMeasure });
    item.save();
    res.send(item);
  });

  // @route PATCH /api/items/:item_id
  // @access Public
  // @description Updates an item
  app.patch('/api/items/:item_id', async (req, res) => {
    let newValues = {};
    const { item_id } = req.params;
    if(req.body.name) newValues.name = req.body.name;
    if(req.body.unitsOfMeasure) newValues.unitsOfMeasure = req.body.unitsOfMeasure;
    try{
      const item = await Item.findOneAndUpdate({ _id: ObjectId(item_id) }, { $set: newValues }, {new: true});
      if (item) {
        const updatedItem = await item.save();
        return res.send(updatedItem);
      }
      return res.status(404).json({ itemNotFound: 'Item not found' }); 
    } catch(err) {
      return res.status(400).json({ error: 'Bad request' });
    }       
  });

  // @route POST /api/items/providers/:item_id
  // @access Public
  // @description Add a provider to an item
  app.post('/api/items/providers/:item_id', async (req, res) => {
    const { item_id } = req.params;
    let newProvider = {};
    if(req.body.amountPerProvider) newProvider.amountPerProvider = req.body.amountPerProvider;
    newProvider.name = req.body.name;
    newProvider.pricePerProvider = req.body.pricePerProvider;

    const item = await Item.findById(item_id);
    if(item) {
      item.providers.unshift(newProvider);
      const updatedItem = await item.save();
       return res.json(updatedItem); 
    } 
    res.status(404).json({ success: false, error: 'Item not found' });           
  });

  // @route DELETE /api/items/providers/:item_id/:provider_id
  // @access Public
  // @description Delete an item's provider by its id
  app.delete('/api/items/providers/:item_id/:provider_id', async (req, res) => {
    const { item_id, provider_id } = req.params;
    try {
      const item = await Item.findByIdAndUpdate(item_id, {
        '$pull': {
          'providers':{ '_id': new ObjectId(provider_id) }
        }
      }, { new: true });
      if (item) {
        const updatedItem = await item.save();
        return res.send(updatedItem);
      } 
      return res.status(404).json({ itemNotFound: 'Item not found' });      
    } catch(err) {
      return res.status(500).json({ error: 'Server error' });
    }    
  });

  // @route DELETE /api/items/:item_id
  // @access Public
  // @description Delete an item by its id
  app.delete('/api/items/:item_id', async (req, res) => {
    const { item_id } = req.params;
    try {
      await Item.findByIdAndRemove(item_id);
      res.send({ success: true });
    } catch (err) {
      res.status(500).res.json(err);
    }
  });
}
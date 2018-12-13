// This is a mongo subdocument 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: { type: String, required: true },
  pricePerProvider: { type: Number, required: true },
  amountPerProvider: { type: Number, default: 0 }, 
});

module.exports = providerSchema;
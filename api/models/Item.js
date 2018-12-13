const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProviderSchema = require('./Provider');

const itemSchema = new Schema({
  name: { type: String, required: true },
  unitsOfMeasure: { type: String, required: true },
  providers: [ProviderSchema],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date },
  available: { type: Boolean }
  // _client: { type: Schema.Types.ObjectId, ref: 'Client' }
});

mongoose.model('items', itemSchema);
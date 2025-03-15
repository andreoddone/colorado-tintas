const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  colorCode: { type: String, required: true },
  type: { type: String, enum: ['Latex', 'Acrílica', 'Esmalte'] },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  lastSync: { type: Date }
});

module.exports = mongoose.model('Product', ProductSchema);

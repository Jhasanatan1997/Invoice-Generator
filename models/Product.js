const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
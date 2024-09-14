const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  date: { type: Date, default: Date.now },
  pdfPath: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Quotation', QuotationSchema);
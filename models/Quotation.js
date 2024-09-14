const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pdfLinks: [String]
}, { timestamps: true });

module.exports = mongoose.model('Quotation', QuotationSchema);
// const express = require('express');
// const Quotation = require('../models/Quotation');
// const authMiddleware = require('../middleware/auth');
// const pdfGenerator = require('../utils/pdfGenerator');

// const router = express.Router();

// // generate pdf and save the path in db
// router.post('/', authMiddleware, async (req, res, next) => {
//   const { products } = req.body;
//   try {
//     const userId = req.user.id;
//     const newQuotation = new Quotation({ userId, products });
//     await newQuotation.save();

//     // Generate PDF
//     const pdfPath = await pdfGenerator.generatePDF(newQuotation);

//     newQuotation.pdfPath = pdfPath;
//     await newQuotation.save();

//     res.status(201).json({ pdfPath });
//   } catch (error) {
//     next(error)
//   }
// });




// router.get('/', authMiddleware, async (req, res, next) => {
//   const userId = req.user.id;

//   try {
//     const quotations = await Quotation.find({ userId });
//     res.status(200).json(quotations);

//   } catch (error) {
//     next(error)
//   }
// });


// module.exports = router;
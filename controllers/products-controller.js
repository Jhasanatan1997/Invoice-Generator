const path = require('path');
const { generatePDF, uploadToFileIO } = require('../utils/pdfGenerator');
const Product = require('../models/Product');
const Quotation = require('../models/Quotation');
const errors = require('../utils/errors/error');

// Your handler function
const saveProductsAndGeneratePDF = async (req, res) => {

    const { products } = req.body;
    try {
        
        // Save products to the database
        const savePromises = products.map(async (product) => {
        product.gst = product.rate * 0.18; // GST calculation
        product.userId = req.user.id;
        const newProduct = new Product(product);
        await newProduct.save();
        return newProduct; // Return the saved product
        });

        const savedProducts = await Promise.allSettled(savePromises);

        const pdfPath = await generatePDF(req.user.id, savedProducts);

        // Construct the PDF link
        const pdfLink = await uploadToFileIO(pdfPath);

        //saving generated pdfLinks to db
        await Quotation.findOneAndUpdate(
            { userId: req.user.id },
            { $push: { pdfLinks: pdfLink } },
            { upsert: true, new: true } // Create a new document if not found (upsert)
        );

        return{
            status: 200,
            savedProducts: savedProducts,
            pdfLink: pdfLink
        };

    } catch (error) {
        throw new errors.ExpectationFailed("Error occured while generating and processing PDF");
    }
};

module.exports = {saveProductsAndGeneratePDF};
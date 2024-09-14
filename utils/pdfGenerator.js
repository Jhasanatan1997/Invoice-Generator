const fs = require('fs');
const path = require('path');
const axios = require('axios');
const puppeteer = require('puppeteer');
const FormData = require('form-data');  


const generatePDF = async (userId, quotation) => {
  // console.log("quotation", quotation)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlContent = `
  
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    h1 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f4f4f4;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 12px;
    }
    td {
      font-size: 14px;
    }
    .totals {
      width: 100%;
      margin-top: 20px;
    }
    .totals td {
      padding: 8px;
      font-size: 14px;
      text-align: right;
    }
    .totals .label {
      font-weight: bold;
      text-align: left;
    }
    .totals .grand-total {
      font-size: 16px;
      font-weight: bold;
      color: #007bff;
    }
    .totals .grand-total td {
      border-top: 2px solid #000;
    }
    .currency {
      font-weight: bold;
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Invoice</h1>

  <!-- Products Table -->
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${quotation.map(product => `
        <tr>
          <td>${product.value.name}</td>
          <td>${product.value.qty}</td>
          <td>${product.value.rate.toFixed(2)}</td>
          <td>${(product.value.qty * product.value.rate).toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <!-- Totals Section -->
  <table class="totals">
    <tbody>
      <tr>
        <td class="label">Total</td>
        <td>INR ${(quotation.reduce((acc, product) => acc + (product.value.qty * product.value.rate), 0)).toFixed(2)}</td>
      </tr>
      <tr>
        <td class="label">GST</td>
        <td>18%</td>
      </tr>
      <tr class="grand-total">
        <td class="label">Grand Total</td>
        <td class="currency">INR ${(quotation.reduce((acc, product) => acc + (product.value.qty * product.value.rate), 0) * 1.18).toFixed(2)}</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

  // Define the path to save the PDF
  const pdfFolderPath = path.resolve(__dirname, '../pdfs');
  
  // Ensure the folder exists
  if (!fs.existsSync(pdfFolderPath)) {
    fs.mkdirSync(pdfFolderPath);
  }

  // Construct a unique file name for the PDF
  const pdfFileName = `quotation-${userId}-${Date.now()}.pdf`;
  const pdfFilePath = path.join(pdfFolderPath, pdfFileName);

  // Save the PDF file
  await page.pdf({ path: pdfFilePath, format: 'A4' });

  await browser.close();

  return pdfFilePath;
};


const uploadToFileIO = async (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const form = new FormData();
  // Append the file to the form data
  form.append('file', fileData, { filename: 'quotation.pdf' });
  try {
    const response = await axios.post('https://file.io/', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    return response.data.link;

  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
}

module.exports= {
  generatePDF,
  uploadToFileIO
};
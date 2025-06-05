<<<<<<< HEAD
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  postalAddress: String,
  lrNumber: String,
  ownerID: String,
  pin: String,
  phone: String,
  purpose: String,
  paybill: String,
  documents: [String],

  qrCode: {
  type: String
}
});

module.exports = mongoose.model('Property', PropertySchema);
=======
// backend/models/Property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  postalAddress: String,
  lrNumber: String,
  permitCertificate: String,
  ownerName: String,
  projectUse: String,
  unitDetails: String,
  mpesaInfo: String,
  bankInfo: String,
  occupancyCertificate: String,
  leasingAgreement: String,
  qrCodeUrl: String
});

module.exports = mongoose.model('Property', propertySchema);
>>>>>>> dcd5257 (Fix: Recreate Property.js to match required import path)

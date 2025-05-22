const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  postalAddress: String,
  lrNumber: String,
  ownerID: String,
  pin: String,
  phone: String,
  purpose: String,
  paybill: String,
  documents: [String]
});

module.exports = mongoose.model('Property', PropertySchema);

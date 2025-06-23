// backend/models/Property.js

const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  postalAddress: {
    type: String,
    required: true,
    trim: true,
  },
  lrNumber: {
    type: String,
    required: true,
    trim: true,
  },
  ownerID: {
    type: String,
    required: true,
    trim: true,
  },
  pin: {
    type: String,
    default: '',
    trim: true,
  },
  phone: {
    type: String,
    default: '',
    trim: true,
  },
  purpose: {
    type: String,
    enum: ['rent', 'sale'],
    required: true,
  },
  paybill: {
    type: String,
    required: true,
  },
  documents: {
    type: [String],
    default: [],
  },
  qrCode: {
    type: String,
    default: '',
  },
  leasingAgreement: {
    type: String,
    default: '',
  },
  permitCertificate: {
    type: String,
    default: '',
  },
  occupancyCertificate: {
    type: String,
    default: '',
  },
  unitDetails: {
    type: String,
    default: '',
  },
  mpesaInfo: {
    type: String,
    default: '',
  },
  bankInfo: {
    type: String,
    default: '',
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', PropertySchema);

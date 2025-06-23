// backend/models/Tenant.js

const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+254(1\d{8}|7\d{8})$/, 'Phone number must be a valid Kenyan format'],
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
  },

  idNumber: {
    type: String,
    trim: true,
    default: '',
  },

  occupation: {
    type: String,
    trim: true,
    default: '',
  },

  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },

  moveInDate: {
    type: Date,
    default: Date.now,
  },

  leaseAgreementFile: {
    type: String,
    default: '',
  },

  monthlyRent: {
    type: Number,
    default: 0,
  },

  serviceCharges: {
    type: String,
    default: '',
  },

  leaseStartDate: {
    type: Date,
  }

}, {
  timestamps: true,
});

module.exports = mongoose.model('Tenant', tenantSchema);

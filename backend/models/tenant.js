// backend/models/Tenant.js

const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
  type: String,
  required: true,
  match: [/^\+?[0-9]{7,15}$/, 'Please enter a valid phone number'],
},

  email: {
    type: String,
    required: false,
    lowercase: true,
  },
  idNumber: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  moveInDate: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tenant', tenantSchema);

const mongoose = require('mongoose');  // <-- Add this line at the top

const transactionSchema = new mongoose.Schema({
  phoneNumber: {  // ✅ renamed to match utility usage
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  mpesaRef: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);

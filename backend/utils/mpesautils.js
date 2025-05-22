// utils/mpesaUtils.js
const Transaction = require('../models/Transaction');

async function getMpesaStatement(phoneNumber) {
  const transactions = await Transaction.find({ phoneNumber });
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  return { total, count: transactions.length, transactions };
}

module.exports = { getMpesaStatement };

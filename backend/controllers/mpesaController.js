// backend/controllers/mpesaController.js

require('dotenv').config();
const Tenant = require('../models/Tenant'); // Make sure this model exists and is correct

/**
 * Simulated M-Pesa STK Push — for registration or rent
 * Endpoint: POST /api/mpesa/stkpush
 */
const initiatePayment = async (req, res) => {
  try {
    const { phone, amount, purpose = 'general' } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        message: 'Phone and amount are required.',
      });
    }

    console.log(`📲 Simulated M-Pesa STK push: KES ${amount} from ${phone} for ${purpose}`);

    return res.status(200).json({
      success: true,
      message: `Simulated STK push for KES ${amount} from ${phone}`,
      purpose,
    });
  } catch (error) {
    console.error('❌ Simulated STK Push Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'STK Push failed',
      error: error.message,
    });
  }
};

/**
 * Freeze landlord M-Pesa account based on tenant deposit data
 * Endpoint: POST /api/mpesa/freeze-account
 */
const freezeAccount = async (req, res) => {
  try {
    const { buildingId, magistratePhone } = req.body;

    if (!buildingId || !magistratePhone) {
      return res.status(400).json({
        success: false,
        message: 'buildingId and magistratePhone are required.',
      });
    }

    // ✅ Fetch tenants who lived in this building in last 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const tenants = await Tenant.find({
      property: buildingId,
      moveInDate: { $lte: new Date(), $gte: threeMonthsAgo }
    });

    if (!tenants.length) {
      return res.status(404).json({
        success: false,
        message: 'No recent tenants found in this building.',
      });
    }

    const totalDeposits = tenants.reduce((sum, tenant) => {
      return sum + (tenant.depositAmount || 0);
    }, 0);

    const freezeAmount = totalDeposits + totalDeposits * 0.10;

    console.log(`🚫 Simulated Freeze: KES ${freezeAmount} frozen for building ${buildingId} from M-Pesa.`);

    // Optionally send SMS to magistrate here

    return res.status(200).json({
      success: true,
      message: `Simulated freeze initiated. Total frozen: KES ${freezeAmount.toFixed(2)}`,
      tenantCount: tenants.length,
      freezeAmount,
    });
  } catch (error) {
    console.error('❌ Freeze Account Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

module.exports = {
  initiatePayment,
  freezeAccount,
};

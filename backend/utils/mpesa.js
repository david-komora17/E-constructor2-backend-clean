// utils/mpesa.js
const stkPush = async (phoneNumber, amount, purpose) => {
  // ...
  const response = await axios.post(
    process.env.MPESA_STK_PUSH_URL,
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.BASE_URL}/api/mpesa/stk-callback`,
      AccountReference: purpose, // helpful reference
      TransactionDesc: `Payment for ${purpose}` // improves logs
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

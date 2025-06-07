// server.js (Cleaned & Ready to Launch)
require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./backend/middleware/errorHandler');
const propertyRoutes = require('./backend/routes/propertyRoutes');
const notifyPoliceRoutes = require('./backend/routes/notifyPoliceRoutes');
const magistrateRoutes = require('./backend/routes/magistrateRoutes');



// Load env vars
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('public/uploads'));
app.use('/api/property', require('./backend/routes/propertyRoutes'));
app.use('/api/mpesa', require('./backend/routes/mpesaRoutes'));
app.use('/api/police', require('./backend/routes/notifyPoliceRoutes'));
app.use('/api/sms', require('./backend/routes/smsRoutes'));
app.use('/api/user', require('./backend/routes/userRoutes'));
app.use('/api/magistrates', magistrateRoutes);



// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 7050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// Force redeploy on Railway

// 🔁 Trigger redeploy - 2025-06-07


 
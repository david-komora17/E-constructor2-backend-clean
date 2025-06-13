require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./backend/middleware/errorHandler');

// ✅ Route imports
const propertyRoutes = require('./backend/routes/propertyRoutes');
const mpesaRoutes = require('./backend/routes/mpesaRoutes');
const notifyPoliceRoutes = require('./backend/routes/notifyPoliceRoutes');
const smsRoutes = require('./backend/routes/smsRoutes');
// const userRoutes = require('./backend/routes/userRoutes'); // Skipped for MVP
const magistrateRoutes = require('./backend/routes/magistrateRoutes');

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express
const app = express();

// ✅ Middleware
app.use(cors({
  origin: ['https://funny-tiramisu-d00b04.netlify.app/', '*'],
  credentials: true
}));
app.use(express.json());

// ✅ ADD THIS LINE: To handle form fields in multipart/form-data
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads'));

// ✅ Routes
app.use('/api/property', propertyRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/police', notifyPoliceRoutes);
app.use('/api/sms', smsRoutes);
// app.use('/api/user', userRoutes); // Skip for now
app.use('/api/magistrates', magistrateRoutes);

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 11005;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

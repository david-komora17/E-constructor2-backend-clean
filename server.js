require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./backend/middleware/errorHandler');

// ✅ Route imports (already confirmed correct)
const propertyRoutes = require('./backend/routes/propertyRoutes');
const mpesaRoutes = require('./backend/routes/mpesaRoutes');
const notifyPoliceRoutes = require('./backend/routes/notifyPoliceRoutes');
const smsRoutes = require('./backend/routes/smsRoutes');
// const userRoutes = require('./backend/routes/userRoutes'); // ❌ Commented out since not used
const magistrateRoutes = require('./backend/routes/magistrateRoutes');

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: ['https://funny-tiramisu-d00b04.netlify.app/', '*'], // ✅ Allow Netlify + local for MVP
  credentials: true
}));
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('public/uploads'));

// Routes
app.use('/api/property', propertyRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/police', notifyPoliceRoutes);
app.use('/api/sms', smsRoutes);
// app.use('/api/user', userRoutes); // ❌ Skip for now, not part of MVP
app.use('/api/magistrates', magistrateRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 11001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

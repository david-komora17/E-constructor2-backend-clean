require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./backend/middleware/errorHandler');

// Route imports
const propertyRoutes = require('./backend/routes/propertyRoutes');
const mpesaRoutes = require('./backend/routes/mpesaRoutes');
const notifyPoliceRoutes = require('./backend/routes/notifyPoliceRoutes');
const smsRoutes = require('./backend/routes/smsRoutes');
const magistrateRoutes = require('./backend/routes/magistrateRoutes');
const courtDocsRoute = require('./backend/routes/courtDocsRoute');

connectDB();

const app = express();

// ✅ Accept JSON and form fields (not files) in POST
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads'));

// ✅ Routes
app.use('/api/property', propertyRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/police', notifyPoliceRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/magistrates', magistrateRoutes);
app.use('/api', courtDocsRoute);

// ✅ Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 11009;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

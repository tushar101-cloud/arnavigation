const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const locationRoutes = require('./routes/locations');

const app = express();
const PORT = process.env.PORT || 3000;

// Vercel serverless function compatibility
module.exports = app;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://rishitush:6STJgxPWUeelXVhL@cluster0.1tmfl.mongodb.net/?retryWrites=true&w=majority&appName=cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/locations', locationRoutes);

// Serve main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

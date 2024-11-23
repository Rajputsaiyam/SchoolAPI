const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const schoolRoutes = require('./routes/index');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/schools', schoolRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

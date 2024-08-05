const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/jobApplications', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  resume: String
});

const Application = mongoose.model('Application', applicationSchema);

// Routes
app.post('/api/applications', async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).send('Application received');
  } catch (error) {
    res.status(500).send('Error saving application');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

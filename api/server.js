require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = parseInt(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// 2. Define Mongoose Schemas & Models

const introSchema = new mongoose.Schema({}, { strict: false });
const Intro = mongoose.model('Intro', introSchema, 'intro');

const academicsSchema = new mongoose.Schema({}, { strict: false });
const Academics = mongoose.model('Academics', academicsSchema, 'academics');

const experienceSchema = new mongoose.Schema({}, { strict: false });
const Experience = mongoose.model('Experience', experienceSchema, 'experience');

const aboutSchema = new mongoose.Schema({}, { strict: false });
const About = mongoose.model('About', aboutSchema, 'about');

const skillsSchema = new mongoose.Schema({}, { strict: false });
const Skills = mongoose.model('Skills', skillsSchema, 'skills');

const projectsSchema = new mongoose.Schema({}, { strict: false });
const Projects = mongoose.model('Projects', projectsSchema, 'projects');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { timestamps: true });
const Contact = mongoose.model('Contact', contactSchema, 'contacts');

// 3. Update API endpoints to use MongoDB

app.get('/api/intro', async (req, res) => {
  try {
    const data = await Intro.findOne();
    if (data) {
      const { _id, __v, ...rest } = data.toObject();
      res.status(200).json(rest);
    } else res.status(404).json({ error: 'No intro data found' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching intro data' });
  }
});

app.get('/api/academics', async (req, res) => {
  try {
    const data = await Academics.find();
    if (data.length > 0) {
      const filtered = data.map(doc => {
        const { _id, __v, ...rest } = doc.toObject();
        return rest;
      });
      res.status(200).json(filtered);
    } else res.status(404).json({ error: 'No academics data found' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching academics data' });
  }
});

app.get('/api/experience', async (req, res) => {
  try {
    const data = await Experience.find();
    if (data.length > 0) {
      const filtered = data.map(doc => {
        const { _id, __v, ...rest } = doc.toObject();
        return rest;
      });
      res.status(200).json(filtered);
    } else res.status(404).json({ error: 'No experience data found' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching experience data' });
  }
});

app.get('/api/about', async (req, res) => {
  try {
    const data = await About.findOne();
    if (data) {
      const { _id, __v, ...rest } = data.toObject();
      res.status(200).json(rest);
    } else res.status(404).json({ error: 'No about data found' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching about data' });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const data = await Skills.find();
    if (data.length > 0) {
      const filtered = data.map(doc => {
        const { _id, __v, ...rest } = doc.toObject();
        return rest;
      });
      res.status(200).json(filtered);
    } else res.status(404).json({ error: 'No skills data found' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching skills data' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const data = await Projects.find();
    if (data.length > 0) {
      const filtered = data.map(doc => {
        const { _id, __v, ...rest } = doc.toObject();
        return rest;
      });
      res.status(200).json(filtered);
    } else res.status(404).json({ error: 'No projects data found' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching projects data' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const data = await Contact.find();
    const filtered = data.map(doc => {
      const { _id, __v, ...rest } = doc.toObject();
      return rest;
    });
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

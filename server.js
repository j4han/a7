
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve CSS and other static files
app.use(express.static(path.join(__dirname, 'public')));

// Resume Schema
const resumeSchema = new mongoose.Schema({
    name: String,
    location: String,
    phone: String,
    email: String,
    linkedin: String,
    github: String,
    portfolio: String,
    summary: String,
    education: Array,
    technicalSkills: Array,
    certifications: Array,
    projects: Array,
    keySkills: [String],
    declaration: String
});

const Resume = mongoose.model('Resume', resumeSchema, 'resumes');

// Connect to MongoDB and start the server
async function startServer() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/resumeDB');

        console.log('MongoDB Connected Successfully');

        app.get('/', async (req, res) => {
            try {
                const resume = await Resume.findOne();

                if (!resume) {
                    return res.status(404).send('No resume data found in MongoDB. Run node seed.js first.');
                }

                res.render('cv', { resume });
            } catch (error) {
                console.error(error);
                res.status(500).send('Error loading resume data.');
            }
        });

        app.listen(PORT, () => {
            console.log(`Resume website running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
}

startServer();
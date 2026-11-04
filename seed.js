const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema({
    name: String,
    location: String,
    phone: String,
    email: String,
    linkedin: String,
    github: String,
    portfolio: String,
    summary: String,

    education: [
        {
            qualification: String,
            institution: String,
            period: String,
            resultLabel: String,
            result: String
        }
    ],

    technicalSkills: [
        {
            category: String,
            items: String
        }
    ],

    certifications: [
        {
            title: String,
            points: [String]
        }
    ],

    projects: [
        {
            title: String,
            points: [String]
        }
    ],

    keySkills: [String],
    declaration: String
});


const Resume = mongoose.model(
    'Resume',
    resumeSchema,
    'resumes'
);


const resumeData = {
    name: 'ABDULLA JAHAN',
    location: 'Kerala, India',
    phone: '+91 7306015355',
    email: 'abdullajahan2@gmail.com',

    linkedin: 'https://linkedin.com/in/abdulla-jahan',
    github: 'https://github.com/j4han',
    portfolio: 'https://j4han.github.io',

    summary: 'Recent Bachelor of Computer Applications (BCA) graduate with a strong foundation in programming, databases, and statistics, seeking an apprenticeship at Google to apply analytical and problem-solving skills. Highly motivated to build a career in data analysis using SQL, Excel, and Python.',

    education: [
        {
            qualification: 'Bachelor of Computer Applications (BCA)',
            institution: 'University of Calicut',
            period: '2022–2025',
            resultLabel: 'GPA',
            result: '6.6/10'
        },
        {
            qualification: '12th Standard',
            institution: 'Kerala Board',
            period: '2022',
            resultLabel: 'Percentage',
            result: '84%'
        },
        {
            qualification: '10th Standard',
            institution: 'THSLC',
            period: '2020',
            resultLabel: 'Grade',
            result: 'A+'
        }
    ],

    technicalSkills: [
        {
            category: 'Programming & Databases',
            items: 'Python (Basic), SQL (Basic)'
        },
        {
            category: 'Data & Productivity Tools',
            items: 'Excel, Data Analysis Fundamentals, Statistics'
        }
    ],

    certifications: [
        {
            title: 'IBM Data Science Professional Certificate | Coursera (2025)',
            points: [
                'Developed practical data science skills covering methodologies, tools, and real-world workflows.',
                'Learned and applied Python, SQL, and data visualization tools for analytical tasks.'
            ]
        }
    ],

    projects: [
        {
            title: 'CNAV | Android Campus Navigation Application',
            points: [
                'Led development of an Android campus navigation app to streamline indoor and campus-wide transit.',
                'Implemented QR navigation, student information access, and real-time campus notifications.'
            ]
        }
    ],

    keySkills: [
        'Eagerness to Learn',
        'Team Leadership',
        'Teamwork & Collaboration',
        'Communication',
        'Problem Solving'
    ],

    declaration: 'I hereby declare that the information provided above is true and correct to the best of my knowledge.'
};


async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/resumeDB');
        console.log('MongoDB Connected Successfully');

        await Resume.findOneAndUpdate(
            { email: resumeData.email },
            resumeData,
            {
                upsert: true,
                returnDocument: 'after',
                runValidators: true
            }
        );

        console.log('Resume data inserted/updated successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
}

seedDatabase();

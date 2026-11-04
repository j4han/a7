
const mongoose = require('mongoose');

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

// Resume Model
const Resume = mongoose.model(
    'Resume',
    resumeSchema,
    'resumes'
);

// Resume Data
const resumeData = {
    name: 'P S SAHAD',
    location: 'Ernakulam, Kerala',
    phone: '+919495089363',
    email: 'sahadps1777@gmail.com',

    linkedin: 'https://www.linkedin.com/in/sahad-ps',
    github: 'https://www.github.com/Sahad-77',
    portfolio: 'https://sahad-77.github.io/portfolio/',

    summary: 'BCA graduate interested in software developing with a disciplined approach to coding and debugging. Proficient in programming languages like C and Python. Well-versed in object-oriented programming concepts, data structures, and algorithms, with theoretical knowledge of the software development cycle, Agile methodologies, AI/ML fundamentals, and software testing. Familiar with the Linux environment and IDEs. Possess a keen interest in learning new technologies and collaborating with experienced professionals to contribute to impactful projects.',

    education: [
        {
            qualification: 'Bachelor of Computer Applications (BCA)',
            institution: 'MES College Marampally',
            period: '2023–2026',
            resultLabel: 'CGPA',
            result: '8.11'
        },
        {
            qualification: 'Technical Higher Secondary School',
            institution: 'Computer Science, Aluva',
            period: '2021–2023',
            resultLabel: 'Percentage',
            result: '93%'
        },
        {
            qualification: 'Talent Public School',
            institution: 'Aluva',
            period: '',
            resultLabel: 'Percentage',
            result: '91%'
        }
    ],

    technicalSkills: [
        {
            category: 'Languages',
            items: 'Python, SQL, C, C++, Java'
        },
        {
            category: 'Core Concepts',
            items: 'Data Analysis, SQL Queries, Database Design, DAX, AI/ML Fundamentals, Software Development Fundamentals, OOPs, DSA'
        },
        {
            category: 'Web Development',
            items: 'HTML, CSS, JavaScript, PHP, Django'
        },
        {
            category: 'Data & Analytics Tools',
            items: 'Power BI, MS Excel, MySQL Workbench'
        }
    ],

    certifications: [
        {
            title: 'Power BI Training Program | ICTAK',
            points: [
                'Completed a 5-day intensive training on data transformation, data modeling, and advanced analytics using DAX.',
                'Gained hands-on experience building interactive dashboards and reports to interpret data and support decision-making.'
            ]
        },
        {
            title: 'Full Stack Web Development with AI Tools | Edunet Foundation',
            points: [
                'Explored AI/ML/DL fundamentals, including predictive models and intelligent data-driven applications.',
                'Acquired experience handling data pipelines between front-end interfaces and server-side databases.',
                'Gained practical knowledge of developing full-stack projects using Python Django and exposure to new tools and technologies.'
            ]
        },
        {
            title: 'AI Skills Passport | EY and Microsoft',
            points: [
                'Completed modules covering foundational AI concepts and data-centric technology skills for modern business environments.'
            ]
        }
    ],

    projects: [
        {
            title: 'NextGenISP | Python (Django), MySQL, React',
            points: [
                'Developed a comprehensive ISP Management System for customer onboarding, billing and support operations.',
                'Implemented Role-Based Access Control (RBAC) dashboards for Customers, Field Staff, Technical Staff and Admins.',
                'Integrated payments, automated invoicing and intelligent ticket management.'
            ]
        },
        {
            title: 'Happen Chain | Python (Django), MySQL',
            points: [
                'Designed and managed the underlying MySQL database to handle structured academic and student data.',
                'Created a centralized data hub, enabling efficient tracking and organization of extracurricular activities.'
            ]
        },
        {
            title: 'Criminal Management System | PHP, MySQL, JS',
            points: [
                'Developed a database-driven application focused on collecting and managing case-related data accurately.',
                'Designed and implemented complex SQL queries for efficient data storage, retrieval, and pattern identification.'
            ]
        }
    ],

    keySkills: [
        'Analytical Thinking & Problem Solving',
        'Hardware and Networking Fundamentals',
        'Windows & Linux Operating Systems',
        'Quick Learner & Adaptable to New Tools',
        'Observation & Logical Reasoning',
        'Teamwork & Communication',
        'Energetic & Self-motivated'
    ],

    declaration: 'I hereby declare that the information provided above is true and correct to the best of my knowledge.'
};

// Insert or update resume in MongoDB
async function seedDatabase() {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/resumeDB'
        );

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
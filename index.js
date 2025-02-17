const express = require('express');
const authRouter = require('./routes/authRouter');  
const pool = require('./db');  
const PORT = process.env.PORT || 5000;

const app = express();  

app.use(express.json()); 

app.use('/auth', authRouter);

const start = async () => {
    try {
        await pool.connect(); 
        console.log('Connected to PostgreSQL database successfully');

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log('Failed to connect to the database:', e);
    }
};

start();





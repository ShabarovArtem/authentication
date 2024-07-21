const express = require('express');
const authRouter = require('./routes/authRouter');  // Импортируем маршруты для авторизации
const pool = require('./db');  // Импортируем пул подключений
const PORT = process.env.PORT || 5000;

const app = express();  // Создаём сам сервер

app.use(express.json()); // Подключаем middleware для парсинга JSON данных в теле запросов.

// Используем только нужные маршруты
app.use('/auth', authRouter);

const start = async () => {
    try {
        await pool.connect(); // Проверка подключения к базе данных
        console.log('Connected to PostgreSQL database successfully');

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log('Failed to connect to the database:', e);
    }
};

start();





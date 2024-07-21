// Загрузка переменных окружения из файла .env
require('dotenv').config();
//Pool — это класс или объект, предоставляемый библиотекой pg,
//который представляет собой пул соединений к базе данных PostgreSQL.
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '21192126',
    database: process.env.DB_NAME || 'authentication',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432
}) //создали объект класса


module.exports = pool
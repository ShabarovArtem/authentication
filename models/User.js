const pool = require('../db');

// Функция для получения пользователя по имени
const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
};

// Функция для создания нового пользователя
const createUser = async (username, password, roles) => {
    const query = `
        INSERT INTO users (username, password, roles)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const values = [username, password, roles];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Функция для получения всех пользователей
const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
};

// // Функция для создания таблицы пользователей
// const createUsersTable = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             password VARCHAR(100) NOT NULL,
//             roles TEXT[]
//         );
//     `;
//     await pool.query(query);
// };
//
// // Функция для создания таблицы ролей
// const createRolesTable = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS roles (
//             id SERIAL PRIMARY KEY,
//             value VARCHAR(50) UNIQUE NOT NULL
//         );
//     `;
//     await pool.query(query);
// };

module.exports = {
    getUserByUsername,
    createUser,
    getAllUsers
};





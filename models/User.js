const pool = require('../db');

const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
};

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

const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    getUserByUsername,
    createUser,
    getAllUsers
};





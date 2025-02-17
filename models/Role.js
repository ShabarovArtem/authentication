const pool = require('../db');

const getRoleByValue = async (value) => {
    const query = 'SELECT * FROM roles WHERE value = $1';
    const result = await pool.query(query, [value]);
    return result.rows[0];
};

module.exports = {
    getRoleByValue
};




const pool = require("../db");

const getAllCategories = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT
            id,
            name
            FROM categories
            ORDER BY id ASC;
            `);

            res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
};
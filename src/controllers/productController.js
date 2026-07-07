const pool = require("../db");

const getAllProducts = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT
            p.id,
            p.name,
            p.description,
            p.image_url,
            p.is_available,
            p.is_featured,
            p.available_from,
            p.available_until,
            p.display_order,
            c.name AS category
            FROM products p
            JOIN categories c
            ON p.category_id = c.id
            ORDER BY p.display_order ASC;
            `);

            res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
};
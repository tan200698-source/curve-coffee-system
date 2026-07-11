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

const getCategoryAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT
                ca.id,
                ca.category_id,
                c.name AS category,
                ca.available_from,
                ca.available_until,
                ca.is_enabled
            FROM category_availability ca
            JOIN categories c
                ON ca.category_id = c.id
            WHERE ca.category_id = $1;
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Category availability not found",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};



    


module.exports = {
    getAllCategories,
    getCategoryAvailability,
};
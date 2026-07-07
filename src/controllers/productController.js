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

//api ProductVariants
const getProductVariants = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT
            id,
            name,
            price,
            is_available,
            display_order,
            image_url
            FROM product_variants
            WHERE product_id = $1
            ORDER BY display_order ASC;
            `,
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};




module.exports = {
    getAllProducts,
    getProductVariants,
};
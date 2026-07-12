const pool = require("../db");

const getAllProducts = async (req, res, next) => {
    try {
        
        const { search, category, page, limit, sort } = req.query;

        const currentPage = Number(page) || 1;
        const perPage = Number(limit) || 10;
        const offset = (currentPage - 1) * perPage;

        let orderBy = "p.display_order ASC";
        
        if (sort === "price") {
            orderBy = "min_price ASC";

        }

        if (sort === "-price") {
            orderBy = "min_price DESC";
        }

        let query = `
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

        (
        SELECT MIN(price)
        FROM product_variants
        WHERE product_variants.product_id = p.id
        ) AS min_price,


        c.name AS category

        FROM products p
        JOIN categories c
        ON p.category_id = c.id
        `;

        const values = [];

        let countQuery = `
        SELECT COUNT(*)::INTEGER AS total
        FROM products p
        JOIN categories c
            ON p.category_id = c.id
        `;

        const countValues = [];

        if (search) {
            const searchValue = `%${search}%`;

            values.push(searchValue);
            countValues.push(searchValue);

            query += ` WHERE p.name ILIKE $${values.length}`;
            countQuery += ` WHERE p.name ILIKE $${countValues.length}`;
        }

        
        if (category) {
            values.push(category);
            countValues.push(category);

            if (search) {
                query += ` AND c.name = $${values.length}`;
                countQuery += ` AND c.name = $${countValues.length}`;
            } else {
                query += ` WHERE c.name = $${values.length}`;
                countQuery += ` WHERE c.name = $${countValues.length}`;
            }
        }

        query += `
        ORDER BY ${orderBy}
        LIMIT $${values.length + 1}
        OFFSET $${values.length + 2};
        `;
    values.push(perPage, offset);

const countResult = await pool.query(countQuery, countValues);

const totalItems = countResult.rows[0].total;
const totalPages = Math.ceil(totalItems / perPage);

const result = await pool.query(query, values);

const products = result.rows;

const productIds = products.map((product) => product.id);


if (productIds.length === 0) {
    return res.json({
        pagination: {
            current_page: currentPage,
            per_page: perPage,
            total_items: totalItems,
            total_pages: totalPages,
        },
        products: [],
    });
}


const variantsResult = await pool.query(
    `
    SELECT
    id,
    product_id,
    name,
    price,
    is_available,
    display_order,
    image_url
    FROM product_variants
    WHERE product_id = ANY($1)
    ORDER BY display_order ASC;
    `,
    [productIds]
);

const productsWithVariants = products.map((product) => {
    const variants = variantsResult.rows.filter(
        (variant) => variant.product_id === product.id
    );

    return {
        ...product,
        variants,
    };
});

res.json({
    pagination: {
        current_page: currentPage,
        per_page: perPage,
        total_items: totalItems,
        total_pages: totalPages,
    },
    products: productsWithVariants,
});

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

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const productResult = await pool.query(
            `
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
            WHERE p.id = $1;
            `,
            [id]
        );
        if (productResult.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        const variantResult = await pool.query(
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

        const product = productResult.rows[0];

        product.variants = variantResult.rows;

        res.json(product);
    } catch (error) {
        next(error);
    }
};




module.exports = {
    getAllProducts,
    getProductVariants,
    getProductById,
};
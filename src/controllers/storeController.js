const pool = require("../db");

const getStoreSettings = async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT
                id,
                store_name,
                phone,
                address,
                google_maps_url,
                opening_time,
                closing_time
            FROM store_settings
            ORDER BY id ASC
            LIMIT 1;
        `);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Store settings not found",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStoreSettings,
};
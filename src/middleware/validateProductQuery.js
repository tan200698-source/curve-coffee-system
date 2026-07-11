const validateProductQuery = (req, res, next) => {
    const { page, limit, sort } = req.query;

    if (page !== undefined) {
        const pageNumber = Number(page);

        if (!Number.isInteger(pageNumber) || pageNumber < 1) {
            return res.status(400).json({
                message: "Page must be a positive integer",
            });
        }
    }

    if (limit !== undefined) {
        const limitNumber = Number(limit);

        if (
            !Number.isInteger(limitNumber) ||
            limitNumber < 1 ||
            limitNumber > 100
        ) {
            return res.status(400).json({
                message: "Limit must be an integer between 1 and 100",
            });
        }
    }

    const allowedSortValues = ["price", "-price"];

    if (sort !== undefined && !allowedSortValues.includes(sort)) {
        return res.status(400).json({
            message: "Sort must be price or -price",
        });
    }

    next();
};

module.exports = validateProductQuery;
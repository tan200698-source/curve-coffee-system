const express = require("express");

const validateProductQuery = require("../middleware/validateProductQuery");

const{
    getAllProducts,
    getProductVariants,
    getProductById,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", validateProductQuery, getAllProducts);

router.get("/:id", getProductById);

router.get("/:id/variants", getProductVariants);

module.exports = router;

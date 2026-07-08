const express = require("express");

const{
    getAllProducts,
    getProductVariants,
    getProductById,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.get("/:id/variants", getProductVariants);

module.exports = router;

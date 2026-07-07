const express = require("express");

const{
    getAllProducts,
    getProductVariants,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id/variants", getProductVariants);

module.exports = router;

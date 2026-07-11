const express = require("express");

const {
    getAllCategories,
    getCategoryAvailability,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id/availability", getCategoryAvailability);

module.exports = router;
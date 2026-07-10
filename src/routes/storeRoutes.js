const express = require("express");

const {
    getStoreSettings,
} = require("../controllers/storeController");

const router = express.Router();

router.get("/", getStoreSettings);

module.exports = router;
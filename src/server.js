const express = require("express");
const pool = require("./db");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const storeRoutes = require("./routes/storeRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");



const app = express();
const PORT = 3000;

app.use(express.json());


app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/store", storeRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("curve-coffee-system");
});


app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
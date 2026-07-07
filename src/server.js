const express = require("express");
const pool = require("./db");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3000;
app.use("/products", productRoutes);
app.use(express.json());

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
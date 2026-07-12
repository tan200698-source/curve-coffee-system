import { useEffect, useState } from "react";
import api from "../services/api";

function HomePage() {
    const [store, setStore] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [
                    storeResponse,
                    categoriesResponse,
                    productsResponse,
                ] = await Promise.all([
                    api.get("/store"),
                    api.get("/categories"),
                    api.get("/products?page=1&limit=100"),
                ]);

                setStore(storeResponse.data);
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data.products);
            } catch (error) {
                console.error(error);
                setError("Unable to load store information");
            }
        };

        fetchHomeData();
    }, []);

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!store) {
        return <h1>Loading...</h1>;
    }

    return (
        <main>
            <h1>{store.store_name}</h1>
            <p>{store.address}</p>

            <p>
                {store.opening_time} - {store.closing_time}
            </p>

            <h2>Menu Categories</h2>

            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>

            <h2>Our Menu</h2>

            <div>
                {products.map((product) => (
                    <article key={product.id}>
                        <h3>{product.name}</h3>

                        <p>{product.category}</p>

                        <p>Starting from ฿{product.min_price}</p>

                        <ul>
                            {product.variants.map((variant) => (
                                <li key={variant.id}>
                                    {variant.name} — ฿{variant.price}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default HomePage;
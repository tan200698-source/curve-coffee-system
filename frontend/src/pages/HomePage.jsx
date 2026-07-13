import { useEffect, useState } from "react";
import api from "../services/api";


import StoreHeader from "../components/StoreHeader";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";


function HomePage() {
    const [store, setStore] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

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

    const filteredProducts =
    selectedCategory === "All"
        ? products
        : products.filter(
              (product) => product.category === selectedCategory
          );

    return (
    <main>
        <StoreHeader store={store} />

        <CategoryList
             categories={categories}
             selectedCategory={selectedCategory}
             onSelectCategory={setSelectedCategory}
        />

        <section>
            <h2>Our Menu</h2>

            <div>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    </main>
);

           
}

export default HomePage;
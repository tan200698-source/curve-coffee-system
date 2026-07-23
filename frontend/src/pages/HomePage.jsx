import { useEffect, useState } from "react";
import api from "../services/api";
import "./HomePage.css";


import StoreHeader from "../components/StoreHeader";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";


function HomePage() {
    const [store, setStore] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [sort, setSort] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);


    useEffect(() => {
    const fetchStoreData = async () => {
        try {
            const [storeResponse, categoriesResponse] =
                await Promise.all([
                    api.get("/store"),
                    api.get("/categories"),
                ]);

            setStore(storeResponse.data);
            console.log(storeResponse.data);
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error("Store data error:", error);
            console.error(
                "Backend response:",
                error.response?.data
            );

            setError("Unable to load store data");
        }
    };

    fetchStoreData();
}, []);

useEffect(() => {
    const fetchProducts = async () => {
        setIsLoadingProducts(true);

        try {
            const productsResponse = await api.get(
                "/products",
                {
                    params: {
                        page: 1,
                        limit: 100,
                        search:
                            debouncedSearch ||
                            undefined,
                        category:
                            selectedCategory === "All"
                                ? undefined
                                : selectedCategory,
                        sort: sort || undefined,
                    },
                }
            );

            console.log(
                "Products:",
                productsResponse.data
            );

            setProducts(
                productsResponse.data.products
            );
        } catch (error) {
            console.error(
                "Products API error:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            setProducts([]);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    fetchProducts();
}, [debouncedSearch, selectedCategory, sort]);





    
    




    if (error) {
        return <h1>{error}</h1>;
    }

    if (!store) {
        return <h1>Loading...</h1>;
    }


    return (
    <main className="home-page">
        <StoreHeader store={store} />

        <ProductFilters
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
        />

        <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
        />

        <section className="menu-section">
            <h2>Our Menu</h2>

            {isLoadingProducts ? (
                <p className="menu-message">
                    Loading menu...
                </p>
            ) : products.length === 0 ? (
                <p className="menu-message">
                    No menu items found.
                </p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </section>
    </main>
);


}

export default HomePage;
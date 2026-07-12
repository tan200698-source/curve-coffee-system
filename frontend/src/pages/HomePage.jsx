import { useEffect, useState } from "react";
import api from "../services/api";

function HomePage() {
    const [store, setStore] = useState(null);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await api.get("/store");

                setStore(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStore();
    }, []);

    if (!store) {
        return <h1>Loading...</h1>;
    }

    return (
        <main>
            <h1>{store.store_name}</h1>

            <p>{store.address}</p>

            <p>
                {store.opening_time}
                {" - "}
                {store.closing_time}
            </p>
        </main>
    );
}

export default HomePage;
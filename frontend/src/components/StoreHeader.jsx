import "./StoreHeader.css";

function StoreHeader({ store }) {
    const openingTime = store.opening_time.slice(0, 5);
    const closingTime = store.closing_time.slice(0, 5);

    return (
        <header className="store-header">
            <h1>{store.store_name}</h1>

            <p className="store-status">
                Open {openingTime} - {closingTime}
            </p>
        </header>
    );
}

export default StoreHeader;
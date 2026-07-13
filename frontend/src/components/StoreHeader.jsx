function StoreHeader({ store }) {
    return (
        <header>
            <h1>{store.store_name}</h1>

            <p>{store.address}</p>

            <p>
                {store.opening_time} - {store.closing_time}
            </p>
            
        </header>
    );
}

export default StoreHeader;
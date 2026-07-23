import "./ProductFilters.css";

function ProductFilters({
    search,
    onSearchChange,
    sort,
    onSortChange,
}) {
    return (
        <section className="filters">
            <h2>Find Your Drink</h2>

            <div className="filters-controls">
                <input
                    type="text"
                    placeholder="Search menu..."
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                />

                <select
                    value={sort}
                    onChange={(event) =>
                        onSortChange(event.target.value)
                    }
                >
                    <option value="">
                        Default order
                    </option>

                    <option value="price">
                        Price: Low to High
                    </option>

                    <option value="-price">
                        Price: High to Low
                    </option>
                </select>
            </div>
        </section>
    );
}

export default ProductFilters;
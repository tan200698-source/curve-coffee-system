function CategoryList({
    categories,
    selectedCategory,
    onSelectCategory,
}) {
    return (
        <section>
            <h2>Menu Categories</h2>

            <button
                type="button"
                onClick={() => onSelectCategory("All")}
            >
                All
            </button>

            {categories.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                        onSelectCategory(category.name)
                    }
                >
                    {category.name}
                </button>
            ))}

            <p>Selected: {selectedCategory}</p>
        </section>
    );
}

export default CategoryList;
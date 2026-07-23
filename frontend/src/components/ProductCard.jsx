import "./ProductCard.css";

function ProductCard({ product }) {
    return (
        <article className="product-card">
            <h3>{product.name}</h3>

            <p className="product-category">
                {product.category}
            </p>

            <p className="product-price">
                Starting from ฿{product.min_price}
            </p>

            <ul className="variant-list">
                {product.variants.map((variant) => (
                    <li
                        key={variant.id}
                        className="variant-item"
                    >
                        <span>{variant.name}</span>

                        <span>฿{variant.price}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default ProductCard;
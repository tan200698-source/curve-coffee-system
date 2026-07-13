function ProductCard({ product }) {
    return (
        <article>
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
    );
}

export default ProductCard;